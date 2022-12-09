import { EShowTypes } from '~shared/.consts';
import { Action, Details, Download, Info, EpisodeItem, ItemImage, Title, Progress, Subtitle } from './styles';

export interface ISearchResultItem {
  imdbId?: string;
  providerTypeId: number;
  serviceId?: string;
  title: string;
  type: EShowTypes;
  imagePreview?: string;
  year?: number;
  link?: string;
  episodes?: number;
}

export interface IEpisodeProps {
  onClick?: () => void;
  progress?: number;
  actions?: number;
  subtitle?: string;
}

export const Episode: React.FC<ISearchResultItem & IEpisodeProps> = ({
  title,
  subtitle,
  progress,
  imagePreview,
  actions,
  onClick,
}) => (
  <EpisodeItem>
    <ItemImage src={imagePreview} />
    <Info>
      <Progress>{progress && <Download />}</Progress>
      <Details onClick={onClick}>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Details>
      {actions && <Action />}
    </Info>
  </EpisodeItem>
);
