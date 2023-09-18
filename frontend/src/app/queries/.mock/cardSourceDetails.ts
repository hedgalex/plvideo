import { EFileTypes } from '~shared/.consts';

export const cardSourceDetailsQueryResult = {
	items: [
		{
			id: 1,
			type: EFileTypes.FOLDER,
			name: 'foldername',
		},
		{
			id: 2,
			type: EFileTypes.MOVIE,
			name: 'filename.mp4',
			size: '500MB',
		},
		{
			id: 3,
			type: EFileTypes.SUBTITLES,
			name: 'subtitles_en.srt',
			size: '3kB',
		},
		{
			id: 4,
			type: EFileTypes.SUBTITLES,
			name: 'subtitles_ru.srt',
			size: '3kB',
		},
		{
			id: 5,
			type: EFileTypes.SUBTITLES,
			name: 'subtitles_sp.srt',
			size: '3kB',
		},
		{
			id: 6,
			type: EFileTypes.SUBTITLES,
			name: 'subtitles_jp.srt',
			size: '3kB',
		},
		{
			id: 7,
			type: EFileTypes.SUBTITLES,
			name: 'subtitles_pl.srt',
			size: '3kB',
		},
		{
			id: 8,
			type: EFileTypes.SUBTITLES,
			name: 'subtitles_fr.srt',
			size: '3kB',
		},
	],
};