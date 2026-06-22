import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * Categorías del catálogo alineadas con la UI en español.
 * El backend es la fuente de verdad para los valores válidos.
 */
export const APP_CATEGORIES = [
  'acción',
  'aventura',
  'puzzle',
  'carreras',
  'deportes',
  'casual',
  'arcade',
  'estrategia',
] as const;

export type AppCategory = (typeof APP_CATEGORIES)[number];

export interface AppControls {
  scheme: 'keyboard' | 'touch' | 'mouse' | 'hybrid';
  keys?: string;
}

@Entity('apps')
@Index(['category'])
export class App {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  category: AppCategory;

  @Column({ type: 'varchar', length: 2048 })
  url: string;

  @Column({ type: 'varchar', length: 8, default: '🎮' })
  icon: string;

  @Column({ type: 'real', default: 0 })
  rating: number;

  @Column({ default: false })
  trending: boolean;

  @Column({ default: false })
  isLocal: boolean;

  @Column({ type: 'simple-json', nullable: true })
  controls: AppControls | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
