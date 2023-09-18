import axios from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ISources } from '~shared/.ifaces';
import { getCardSourcesEndpoint } from '../endpoints';
// import { cardSourcesQueryResult } from './.mock/cardSources';

interface UseShowQueryProps {
  cardId?: number | string;
}

type CardSourcesQueryResult = ISources;

export const useCardSourcesQuery = ({ cardId }: UseShowQueryProps): UseQueryResult<CardSourcesQueryResult> => {
  const endpoint = getCardSourcesEndpoint(cardId ?? 0);
  return useQuery<CardSourcesQueryResult>(
    [endpoint],
    async () => {
      const response = await axios.get(endpoint);
      return response.data;
      // return cardSourcesQueryResult;
    },
    { enabled: !!cardId },
  );
};
