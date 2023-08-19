export const getCardSourcesEndpoint = (cardId: number) => `/api/card/${cardId}/sources`;

export const getCardSourceDetailsEndpoint = (cardId: number, sourceId: number) =>
  `/api/card/${cardId}/source/${sourceId}`;
