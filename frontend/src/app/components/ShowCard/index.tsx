import { PropsWithChildren, useCallback, useState } from 'react';
import { Box } from '@mui/material';

import { EShowTypes } from '~shared/.consts';
import { Card, CardProps } from '../Card';
import { Sources } from './Sources';
import { Details } from './Details';
import { CardContent, Pages } from './styles';

type ShowCardProps = CardProps & {
  type?: EShowTypes;
};

enum PageNames {
  SOURCES,
  DETAILS,
}

export const ShowCard: React.FC<PropsWithChildren<ShowCardProps>> = ({ id: cardId, type, isOpen, ...props }) => {
  const [page, setPage] = useState<PageNames>(PageNames.SOURCES);
  const [sourceId, setSourceId] = useState<number | null>(null);

  const handleSourceClick = useCallback(
    (sourceId: number) => {
      setPage(PageNames.DETAILS);
      setSourceId(sourceId);
    },
    [cardId],
  );

  const handleBackClick = useCallback(() => {
    setPage(PageNames.SOURCES);
    setSourceId(null);
  }, []);

  return (
    <Card
      id={cardId}
      isOpen={isOpen}
      isImageInFullMode={isOpen}
      subtitle={type === EShowTypes.MOVIE ? 'Movie' : 'TV Series'}
      {...props}
    >
      {isOpen && (
        <CardContent>
          <Pages position={page}>
            <Box>
              <Box>
                <Sources cardId={cardId} onSourceClick={handleSourceClick} />
              </Box>
              <Box>
                <Details cardId={cardId} sourceId={sourceId} onBackClick={handleBackClick} />
              </Box>
            </Box>
          </Pages>
        </CardContent>
      )}
    </Card>
  );
};
