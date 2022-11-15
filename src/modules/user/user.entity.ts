import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Room } from '@/modules/room/room.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column()
  full_name: string;

  @Column()
  password: string;

  @Column()
  is_online: boolean;

  @ManyToMany(() => Room)
  @Column('int', { array: true, nullable: true })
  rooms_ids: number[];
}
