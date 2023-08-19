import { PropsWithChildren } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { EResource, EShowTypes } from '~shared/.consts';
import {
  Actions,
  Container,
  ExpandButton,
  Header,
  Icon,
  Progress,
  SubHeader,
  Subsection,
  Title,
  Wrapper,
} from './styles';
import { Stats } from './Stats';
import { AdditionalStats } from './AdditionalStats';

export type CardExtends = unknown;

export interface Card {
  id: number;
  title: string;
  type?: EShowTypes;
  image?: string;
  year?: number;
  resources: EResource[];
}

export interface CardProps {
  id: number;
  preview?: string;
  isImageInFullMode?: boolean;
  title?: string;
  subtitle?: string;
  popularity?: number;
  popularityIncline?: number;
  votedImdb?: number;
  ratingImdb?: number;

  isOpen?: boolean;
  onTitleClick?: (id: number) => void;
  onExpand?: (id: number) => void;
}

export const Card: React.FC<PropsWithChildren<CardProps>> = ({
  id: showId,
  preview,
  isImageInFullMode = false,
  isOpen = false,
  title = '',
  subtitle = '',
  popularity = 0,
  popularityIncline = 0,
  votedImdb = 0,
  ratingImdb = 0,
  onTitleClick,
  onExpand,
  children,
}) => {
  return (
    <Wrapper>
      <Progress progress={0}>
        <Container isSelected={isOpen}>
          <Stats score={popularity} shift={popularityIncline} />
          {isOpen && <AdditionalStats shift={popularityIncline} voted={votedImdb} rating={ratingImdb} />}
          <Icon isVisible={Boolean(preview)} isInFullMode={isImageInFullMode || isOpen} src={preview} />
          <Title
            onClick={() => {
              onTitleClick?.(showId);
            }}
          >
            <Header>{title}</Header>
            <SubHeader>{subtitle}</SubHeader>
          </Title>
          <Actions className="actions">
            {onExpand && (
              <ExpandButton
                isExpanded={isOpen}
                variant="primary"
                onClick={() => {
                  onExpand?.(showId);
                }}
              >
                <ExpandMoreIcon />
              </ExpandButton>
            )}
          </Actions>
        </Container>
      </Progress>
      <Subsection isOpen={isOpen}>{children}</Subsection>
    </Wrapper>
  );
};
