import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('Streamings')
export class Streaming {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255 })
  title: string;

  @Column({ type: 'text' })
  description?: string;

  @Column({ type: 'text' })
  thumbnail: string;

  @Column({ type: 'text' })
  videoUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt?: Date;
}
