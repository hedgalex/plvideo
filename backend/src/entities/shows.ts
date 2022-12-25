import { Entity, Column, BaseEntity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { ShowTypes } from './showTypes';
import { Episodes } from './episodes';

@Entity()
export class Shows extends BaseEntity {
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
  image: string;

  @Column()
  year: number;

  @Column()
  description: string;

  @Column()
  popularity: number;

  @Column({ name: 'popularity_incline' })
  popularityIncline: number;

  @Column({ name: 'rating_imdb' })
  ratingImdb: number;

  @Column({ name: 'voted_imdb' })
  votedImdb: number;

  @ManyToOne(() => ShowTypes, (showType) => showType.name, { cascade: true })
  @JoinColumn({ name: 'type_id', referencedColumnName: 'id' })
  showType: ShowTypes;

  @Column({ name: 'type_id' })
  type: number;

  @OneToMany(() => Episodes, (episodes) => episodes.show)
  @JoinColumn({ name: 'id', referencedColumnName: 'show_id' })
  episodes: Episodes[];

  @Column()
  imdb: string;

  @Column()
  ororo: string;

  @Column()
  ac: string;

  @Column()
  sync: number;
}
