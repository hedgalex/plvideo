import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import { DownloadResources } from './downloadResources';
import { TaskStatuses } from './taskStatuses';
import { Shows } from './shows';
import { Episodes } from './episodes';

@Entity()
export class Tasks extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Shows, (show) => show, { cascade: true })
  @JoinColumn({ name: 'show_id', referencedColumnName: 'id' })
  show: Shows;

  @Column({ name: 'show_id' })
  showId: number;

  @ManyToOne(() => Episodes, (episode) => episode, { cascade: true })
  @JoinColumn({ name: 'episode_id', referencedColumnName: 'id' })
  episode: Episodes;

  @Column({ name: 'episode_id' })
  episodeId: number;

  @ManyToOne(() => DownloadResources, (downloadResource) => downloadResource.name, { cascade: true })
  @JoinColumn({ name: 'download_resource_id', referencedColumnName: 'id' })
  downloadResource: DownloadResources;

  @Column({ name: 'download_resource_id' })
  downloadResourceId: number;

  @Column()
  started: number;

  @Column()
  finished: number;

  @Column()
  path: string;

  @Column()
  url: string;

  @Column()
  downloaded: number;

  @Column()
  size: number;

  @ManyToOne(() => TaskStatuses, (taskStatus) => taskStatus.name, { cascade: true })
  @JoinColumn({ name: 'task_status_id', referencedColumnName: 'id' })
  taskStatus: TaskStatuses;

  @Column({ name: 'task_status_id' })
  taskStatusId: number;
}
