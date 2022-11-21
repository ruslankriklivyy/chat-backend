import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@/modules/user/user.entity';
import { Message } from '@/modules/message/message.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Message, (message) => message.room)
  @JoinColumn({ name: 'messages', referencedColumnName: 'id' })
  messages: Message[];

  @ManyToMany(() => User)
  @JoinColumn({ name: 'users', referencedColumnName: 'id' })
  users: User[];
}
