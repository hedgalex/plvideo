import { Entity, Column, BaseEntity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Shows } from './shows';

@Entity()
export class Episodes extends BaseEntity {
  @PrimaryColumn('bigint', {
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  id: number;

  @Column()
  title: string;

  @Column()
  season: number;

  @Column()
  episode: number;

  @ManyToOne(() => Shows, (show) => show.episodes)
  @JoinColumn({ name: 'show_id', referencedColumnName: 'id' })
  show: Shows;

  @Column({ name: 'show_id' })
  showId: number;

  @Column()
  release: number;

  @Column()
  imdb: string;

  @Column()
  ororo: string;

  @Column()
  ac: string;
}
