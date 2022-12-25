import { useSelector } from 'react-redux';
import { IState } from '~store/index';
import { Loader } from '~app/styles';
import { Content, Header } from '~app/content/styles';
import { Episode } from '~components/episode';
import { ITask } from '~shared/.ifaces';

export const Downloads: React.FC = () => {
  const { isLoaded, data } = useSelector((state: IState) => state.tasks);

  return (
    <Content>
      {!isLoaded && <Loader />}
      {isLoaded && (
        <>
          <Header variant="h1" fontSize="32px">
            Downloads
          </Header>
          {data.map((task: ITask) => (
            <Episode
              key={task.id}
              id={task.id}
              title={task.title}
              subtitle={task.subtitle}
              imagePreview={task.image}
              isDownloadable
            />
          ))}
        </>
      )}
    </Content>
  );
};
