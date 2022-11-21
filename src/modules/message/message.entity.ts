import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { File } from '@/modules/file/file.entity';
import { Room } from '@/modules/room/room.entity';
import { User } from '@/modules/user/user.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  body: string;

  @Column()
  is_read: boolean;

  @ManyToOne(() => Room, (room) => room.messages)
  @JoinColumn({ name: 'room', referencedColumnName: 'id' })
  room: Room;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'user', referencedColumnName: 'id' })
  user: User;

  @ManyToMany(() => File)
  @JoinTable({
    name: 'message_attached_files',
    joinColumn: { name: 'message', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'file', referencedColumnName: 'id' },
  })
  attached_files: File[];
}
