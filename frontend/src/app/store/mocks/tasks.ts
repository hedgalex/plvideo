import { EResource, ETaskStatus } from '~shared/.consts';

export const tasks1 = [
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

export const tasks2 = [
  {
    id: 14743337955572,
    showId: 6691293983816522,
    title: 'You Reap What You Woe',
    subtitle: 's01e05',
    image: 'https://uploads.ororo-mirror.tv/uploads/show/poster/3053/thumb_z7TQV2AwI2bLYyQ68QHxfAPfaJZ.jpg',
    started: '1672416308441',
    finished: null,
    size: '2404483570',
    downloaded: '16547840',
    resource: EResource.ORORO,
    taskStatus: ETaskStatus.IN_PROGRESS,
  },
  {
    id: 8470794612711960,
    showId: 6691293983816522,
    title: 'Friend or Woe',
    subtitle: 's01e03',
    image: 'https://uploads.ororo-mirror.tv/uploads/show/poster/3053/thumb_z7TQV2AwI2bLYyQ68QHxfAPfaJZ.jpg',
    started: '1672416306090',
    finished: null,
    size: '2234620026',
    downloaded: '28229632',
    resource: EResource.ORORO,
    taskStatus: ETaskStatus.IN_PROGRESS,
  },
  {
    id: 588816617435421,
    showId: 6691293983816522,
    title: "Wednesday's Child Is Full of Woe",
    subtitle: 's01e01',
    image: 'https://uploads.ororo-mirror.tv/uploads/show/poster/3053/thumb_z7TQV2AwI2bLYyQ68QHxfAPfaJZ.jpg',
    started: '1672416304147',
    finished: null,
    size: '2747497264',
    downloaded: '56442880',
    resource: EResource.ORORO,
    taskStatus: ETaskStatus.IN_PROGRESS,
  },
  {
    id: 4539730022297859,
    showId: 7992138828935921,
    title: 'Акацки Делают Свой Ход.',
    subtitle: 's01e02',
    image: 'https://z.animecult.org/uploads/attachment/cover/61603/598_1_wm.jpg',
    started: '1672391817014',
    finished: '1672391884280',
    size: '113656998',
    downloaded: '113656998',
    resource: EResource.AC,
    taskStatus: ETaskStatus.READY,
  },
];
