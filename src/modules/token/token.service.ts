import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Equal, Repository } from 'typeorm';

import { REPOSITORIES } from '@/utils/consts';
import { Token } from '@/modules/token/token.entity';
import { IUser } from '@/modules/user/user.interfaces';
import { CreateOneToken } from '@/modules/token/token.interfaces';

@Injectable()
export class TokenService {
  constructor(
    @Inject(REPOSITORIES.TOKEN_REPOSITORY)
    private readonly tokenRepository: Repository<Token>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async generateTokens(payload: Omit<IUser, 'id' | 'avatar_url' | 'room_ids'>) {
    const access_token = await this.jwt.signAsync(
      { ...payload },
      {
        expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'),
        secret: this.configService.get('JWT_ACCESS_SECRET'),
      },
    );
    const refresh_token = await this.jwt.signAsync(
      { ...payload },
      {
        expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRES_IN'),
        secret: this.configService.get('JWT_REFRESH_SECRET'),
      },
    );

    return {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
  }

  async createOne(payload: CreateOneToken) {
    const { userId, refreshToken } = payload;
    const token = await this.tokenRepository.findOneBy({ user: Equal(userId) });

    if (token) {
      token.refresh_token = refreshToken;
      return this.tokenRepository.update(token.id, token);
    }

    return this.tokenRepository.save({
      user_id: userId,
      refresh_token: refreshToken,
    });
  }

  validateRefreshToken(refreshToken: string) {
    return this.jwt.verify(refreshToken, {
      secret: this.configService.get('JWT_REFRESH_SECRET'),
    });
  }

  findRefreshToken(refreshToken: string) {
    return this.tokenRepository.findOneBy({ refresh_token: refreshToken });
  }

  removeRefreshToken(refreshToken: string) {
    return this.tokenRepository.delete({ refresh_token: refreshToken });
  }
}
