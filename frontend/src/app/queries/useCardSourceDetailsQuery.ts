import axios from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ISourceContentItem } from '~shared/.ifaces';
import { getCardSourceDetailsEndpoint } from '../endpoints';
import { IListResult } from '~shared/.ifaces';
// import { cardSourceDetailsQueryResult } from './.mock/cardSourceDetails';

interface UseCardSourceDetailsQueryProps {
  cardId: number;
  sourceId: number | null;
}

type CardSourcesQueryResult = IListResult<ISourceContentItem>;

export const useCardSourceDetailsQuery = ({
  cardId,
  sourceId,
}: UseCardSourceDetailsQueryProps): UseQueryResult<CardSourcesQueryResult> => {
  const endpoint = getCardSourceDetailsEndpoint(cardId ?? 0, sourceId ?? 0);
  return useQuery<CardSourcesQueryResult>(
    [endpoint],
    async () => {
      const response = await axios.get(endpoint);
      return response.data;
      // return cardSourceDetailsQueryResult;
    },
    { enabled: !!cardId && !!sourceId },
  );
};
