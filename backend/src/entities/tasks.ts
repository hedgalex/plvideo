import { Entity, Column, BaseEntity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { DownloadResources } from './downloadResources';
import { TaskStatuses } from './taskStatuses';
import { Episodes } from './episodes';

@Entity()
export class Tasks extends BaseEntity {
  @PrimaryColumn('bigint', {
    transformer: {
      to: (value) => value,
      from: (value) => parseInt(value),
    },
  })
  id: number;

  @ManyToOne(() => Episodes, (episode) => episode, { cascade: true })
  @JoinColumn({ name: 'id', referencedColumnName: 'id' })
  episode: Episodes;

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

  @ManyToOne(() => DownloadResources, (downloadResource) => downloadResource.name, { cascade: true })
  @JoinColumn({ name: 'download_resource_id', referencedColumnName: 'id' })
  downloadResource: DownloadResources;

  @Column({ name: 'download_resource_id' })
  downloadResourceId: number;

  @ManyToOne(() => TaskStatuses, (taskStatus) => taskStatus.name, { cascade: true })
  @JoinColumn({ name: 'task_status_id', referencedColumnName: 'id' })
  taskStatus: TaskStatuses;

  @Column({ name: 'task_status_id' })
  taskStatusId: number;

  @Column()
  error: string;

  @Column({ name: 'error_time' })
  errorTime: number;
}
