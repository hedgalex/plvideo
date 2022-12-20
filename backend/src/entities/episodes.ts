import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import { Shows } from './shows';

@Entity()
export class Episodes extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  season: number;

  @Column()
  episode: number;

  @ManyToOne(() => Shows, (show) => show, { cascade: true })
  @JoinColumn({ name: 'show_id', referencedColumnName: 'id' })
  show: Shows;

  @Column({ name: 'show_id' })
  showId: string;
}
