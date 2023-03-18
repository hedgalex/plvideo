import { useSelector } from 'react-redux';
import { IState } from '~store/index';
import { Content, Header } from '~app/content/styles';
import { Episode } from '~components/episode';
import { ITask } from '~shared/.ifaces';
import { ProgressLoader } from '~app/styles';

export const Downloads: React.FC = () => {
  const { isLoaded, data } = useSelector((state: IState) => state.tasks);
  return (
    <Content>
      <Header variant="h1">Downloads</Header>
      <ProgressLoader loading={!isLoaded}>
        {isLoaded &&
          data.map((task: ITask) => (
            <Episode
              key={task.id}
              id={task.id}
              showId={task.showId}
              title={task.title}
              subtitle={task.subtitle}
              image={task.image}
              resources={[task.resource]}
              isDownloadable
              isProgressShown
            />
          ))}
      </ProgressLoader>
    </Content>
  );
};
