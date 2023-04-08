import { Entity, Column, BaseEntity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Shows } from './shows';
import { EShowTypes } from '../shared/.consts';

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

  episodeTitle = () => {
    const { show } = this;
    return show?.type === EShowTypes.MOVIE ? show?.title : this.title;
  };

  episodeSubtitle = () => {
    const { show } = this;
    if (show?.type === EShowTypes.MOVIE) {
      return `${show?.year}`;
    }
    const { season = 0, episode = 0 } = this;
    const seasonName = String(season).length === 1 ? `0${season}` : season;
    const episodeName = String(episode).length === 1 ? `0${episode}` : episode;
    return `s${seasonName}e${episodeName}`;
  };
}
