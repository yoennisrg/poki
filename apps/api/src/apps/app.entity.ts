import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type AppCategory =
  | 'action'
  | 'adventure'
  | 'arcade'
  | 'puzzle'
  | 'racing'
  | 'sports'
  | 'strategy';

@Entity('apps')
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  category: AppCategory;

  @Column()
  url: string;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ default: false })
  trending: boolean;

  @Column({ default: false })
  isLocal: boolean;

  @Column({ type: 'simple-json', nullable: true })
  controls: Record<string, unknown> | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
