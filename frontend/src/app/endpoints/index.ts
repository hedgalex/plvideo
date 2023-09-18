export const getShowEndpoint = (showId: number | string) => `/api/show/${showId}`;

export const getCardSourcesEndpoint = (cardId: number | string) => `/api/card/${cardId}/sources`;

export const getCardSourceDetailsEndpoint = (cardId: number, sourceId: number) =>
  `/api/card/${cardId}/source/${sourceId}`;
