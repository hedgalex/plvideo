import { EResource, ETaskStatus } from '~shared/.consts';

export const tasks = [
  [
    {
      id: 7444507090052396,
      showId: 4633326803461405,
      title: 'The Idea of North',
      subtitle: 's01e02',
      image: 'https://uploads.ororo-mirror.tv/uploads/show/poster/1821/thumb_l5Mju9x81vP4Z28wO4ClzKthJim.jpg',
      started: '1671962338312',
      finished: null,
      size: '1275278871',
      downloaded: '0',
      resource: EResource.ORORO,
      taskStatus: ETaskStatus.IN_PROGRESS,
    },
    {
      id: 741422564592334,
      showId: 4633326803461405,
      title: "Lyra's Jordan",
      subtitle: 's01e01',
      image: 'https://uploads.ororo-mirror.tv/uploads/show/poster/1821/thumb_l5Mju9x81vP4Z28wO4ClzKthJim.jpg',
      started: '1671962336201',
      finished: null,
      size: '1248064712',
      downloaded: '1248064712',
      resource: EResource.ORORO,
      taskStatus: ETaskStatus.READY,
    },
  ],
];
