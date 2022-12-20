import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import { ShowTypes } from './showTypes';

@Entity()
export class Shows extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  year: number;

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
  taskStatus: ShowTypes;

  @Column({ name: 'type_id' })
  type: number;

  @Column()
  imdb: string;

  @Column()
  ororo: string;

  @Column()
  ac: string;

  @Column()
  sync: number;
}
