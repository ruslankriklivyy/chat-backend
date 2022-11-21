import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AUTHORIZATION, REPOSITORIES } from '@/utils/consts';
import { User } from '@/modules/user/user.entity';
import {
  ILoginPayload,
  ILogoutPayload,
  IRefreshPayload,
  IRegisterPayload,
} from '@/modules/auth/auth.interfaces';
import { TokenService } from '@/modules/token/token.service';
import { UserService } from '@/modules/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(REPOSITORIES.USER_REPOSITORY)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async register(payload: IRegisterPayload) {
    const { email, full_name, password } = payload;
    const user = await this.userRepository.findOneBy({
      email: Equal(email),
    });

    if (user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Email is already use',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(password, AUTHORIZATION.SALT_ROUNDS);
    const userPayload = {
      email,
      full_name,
      password: hashPassword,
      is_online: false,
    };
    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(userPayload);

    const newUser = await this.userRepository.save({
      ...userPayload,
    });

    await this.tokenService.createOne({ userId: newUser.id, refreshToken });

    return {
      user: newUser,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async login(payload: ILoginPayload) {
    const { email, password } = payload;
    const user = await this.userRepository.findOneBy({
      email: Equal(email),
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Email or password is incorrect',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const isEqualsPassword = await bcrypt.compare(password, user.password);

    if (!isEqualsPassword) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Email or password is incorrect',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { accessToken, refreshToken } =
      await this.tokenService.generateTokens(user);

    await this.tokenService.createOne({ userId: user.id, refreshToken });

    return {
      user,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async refresh(payload: IRefreshPayload) {
    try {
      const { refresh_token } = payload;
      const decodedData = await this.tokenService.validateRefreshToken(
        refresh_token,
      );
      const token = await this.tokenService.findRefreshToken(refresh_token);
      const user = await this.userRepository.findOneBy({
        email: decodedData.email,
      });

      if (!decodedData || !token || !user) {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      const { accessToken, refreshToken } =
        await this.tokenService.generateTokens(user);

      return {
        user,
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Unauthorized',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  logout(payload: ILogoutPayload) {
    const { refresh_token } = payload;
    return this.tokenService.removeRefreshToken(refresh_token);
  }
}
