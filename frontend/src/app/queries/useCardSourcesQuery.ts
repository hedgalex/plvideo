import axios from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ISources } from '~shared/.ifaces';
import { getCardSourcesEndpoint } from '../endpoints';
// import { cardSourcesQueryResult } from './.mock/cardSources';

interface UseCardSourcesQueryProps {
  cardId?: number;
}

type CardSourcesQueryResult = ISources;

export const useCardSourcesQuery = ({ cardId }: UseCardSourcesQueryProps): UseQueryResult<CardSourcesQueryResult> => {
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
