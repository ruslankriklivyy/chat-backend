import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from '@/modules/room/room.entity';
import { Message } from '@/modules/message/message.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @Column()
  is_online: boolean;

  @OneToMany(() => Message, (message) => message.user)
  @JoinColumn({ name: 'messages', referencedColumnName: 'id' })
  messages: Message[];

  @ManyToMany(() => Room)
  @JoinTable({
    name: 'user_rooms',
    joinColumn: { name: 'user', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'room', referencedColumnName: 'id' },
  })
  rooms: Room[];
}
