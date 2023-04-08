import { IDownload } from '~shared/.ifaces';

export const downloads = {
  items: [
    {
      id: 4496265372206222,
      title: 'The Last of Us',
      image: 'https://uploads.ororo-mirror.tv/uploads/show/poster/3118/thumb_uKvVjHNqB5VmOrdxqAt2F7J78ED.jpg',
      count: 2,
      episodes: [
        { id: 2461185436523612, title: 's01e00', subtitle: 'Episode', status: 'IN_PROGRESS' },
        { id: 3089276333959329, title: 's01e01', subtitle: "When You're Lost in the Darkness", status: 'IN_PROGRESS' },
      ],
    },
    {
      id: 398588423613019,
      title: 'Боруто: Новое поколение Наруто',
      image: 'https://z.animecult.org/uploads/attachment/cover/74526/5680_1_wm.jpg',
      count: 1,
      episodes: [],
    },
  ] as IDownload[],
};
