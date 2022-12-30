import { EpisodeGroup, EpisodeGroupsBlock } from './styles';

export interface IEpisodeGroupsProps {
  current: number;
  list: string[];
  onChange: (seasonNumber: number) => () => void;
}

export const EpisodeGroups: React.FC<IEpisodeGroupsProps> = ({ list = [], current, onChange }) => {
  if (list.length < 1) {
    return <></>;
  }

  return (
    <EpisodeGroupsBlock>
      {list.map((episodeGroup, index) => (
        <EpisodeGroup key={episodeGroup} selected={index === current} onClick={onChange(index)}>
          {episodeGroup}
        </EpisodeGroup>
      ))}
    </EpisodeGroupsBlock>
  );
};
