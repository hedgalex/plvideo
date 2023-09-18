import axios from 'axios';
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getShowEndpoint } from '../endpoints';
// import { show2 } from './.mock/show';

interface UseShowQueryProps {
  showId?: number | string;
}

type ShowQueryResult = any;

export const useShowQuery = ({ showId }: UseShowQueryProps): UseQueryResult<ShowQueryResult> => {
  const endpoint = getShowEndpoint(showId ?? '0');
  return useQuery<ShowQueryResult>(
    [endpoint],
    async () => {
      const response = await axios.get(endpoint);
      return response.data;
      // return show2;
    },
    { enabled: !!showId },
  );
};
