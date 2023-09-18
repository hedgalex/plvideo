import { Content, Header } from '~app/content/styles';
import { IDownload } from '~shared/.ifaces';
import { useDownloads } from '~app/hooks/useDownloads';
import { ProgressLoader } from '~app/styles';
import { Episode } from '~app/components/episode/Episode';
import { EShowTypes } from '~shared/.consts';
import { GroupButton } from './styles';

export const Downloads: React.FC = () => {
  const { isLoading, groups, onShowChange } = useDownloads();
  return (
    <Content>
      <Header variant="h1">Downloads</Header>
      <ProgressLoader loading={isLoading}>
        {!isLoading &&
          groups?.map((group: IDownload) => (
            <>
              {group.type === EShowTypes.TVSHOW && (
                <GroupButton
                  isActive={group?.episodes?.length > 0}
                  onClick={() => {
                    onShowChange(group?.id);
                  }}
                >
                  {group?.title}
                  {group.count > 0 && <span> -- {group.count}</span>}
                </GroupButton>
              )}
              {group?.episodes.map((episode) => (
                <Episode
                  key={episode.id}
                  {...episode}
                  showId={group.id}
                  image={group?.image}
                  isDownloadable
                  isProgressShown
                />
              ))}
            </>
          ))}
      </ProgressLoader>
    </Content>
  );
};
