import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import { getCardSourceDetailsEndpoint } from '../endpoints';

interface CardDownloadMutationParams {
  id: number;
  sourceId: number;
  fileIds: number[];
}

export const useCardDownloadMutation = () => {
  return useMutation({
    mutationFn: async ({ id, sourceId, fileIds }: CardDownloadMutationParams) => {
      try {
        return await axios.post(getCardSourceDetailsEndpoint(id, sourceId), { fileIds });
      } catch (error) {
        throw new Error('Could not add files to download');
      }
    },
  });
};
