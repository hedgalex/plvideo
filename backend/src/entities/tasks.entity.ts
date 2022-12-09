import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne } from 'typeorm';
import { DownloadResources } from './downloadResources.entity';
import { TaskStatuses } from './taskStatuses.entity';

@Entity()
export class Tasks extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'imdb_id' })
  imdbId: number;

  @ManyToOne(() => DownloadResources, (downloadResource) => downloadResource.name, { cascade: true })
  @JoinColumn({ name: 'download_resource_id', referencedColumnName: 'id' })
  downloadResource: DownloadResources;

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
