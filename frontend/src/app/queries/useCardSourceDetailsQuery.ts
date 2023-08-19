import axios from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ISourceContentItem } from '~shared/.ifaces';
import { getCardSourceDetailsEndpoint } from '../endpoints';
// import { cardSourceDetailsQueryResult } from './.mock/cardSourceDetails';

interface UseCardSourceDetailsQueryProps {
  cardId: number;
  sourceId: number | null;
}

type CardSourceDetailsQueryResult = {
  items: ISourceContentItem[];
};

export const useCardSourceDetailsQuery = ({
  cardId,
  sourceId,
}: UseCardSourceDetailsQueryProps): UseQueryResult<CardSourceDetailsQueryResult> => {
  const endpoint = getCardSourceDetailsEndpoint(cardId ?? 0, sourceId ?? 0);
  return useQuery<CardSourceDetailsQueryResult>(
    [endpoint],
    async () => {
      const response = await axios.get(endpoint);
      return response.data;
      // return cardSourceDetailsQueryResult;
    },
    { enabled: !!cardId && !!sourceId },
  );
};
