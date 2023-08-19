import { ISources } from '~shared/.ifaces';
import { EResource } from '~shared/.consts';

export const cardSourcesQueryResult = {
  [EResource.ORORO]: [
    {
      id: 1,
      name: 'Wednesday',
      seeds: -1,
      peers: -1,
      size: '',
    },
  ],
  [EResource.TORRENT]: [
    {
      id: 1,
      name: 'Wednesday.1080p.WEB.H264-GLHF[rartv]',
      seeds: 14,
      peers: 2,
      size: '6 GB',
    },
    {
      id: 2,
      name: 'Wednesday.720p.WEB.H264-GLHF[rartv]',
      seeds: 5,
      peers: 1,
      size: '4 GB',
    },
  ],
} as ISources; 