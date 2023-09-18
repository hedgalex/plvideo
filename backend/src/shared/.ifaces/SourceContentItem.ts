export interface SourceContentItem {
  id: number;
  name: string;
  size?: string;
  rawSize?: number;
  type?: 'folder' | 'file' | 'movie' | 'subtitles';
  isFolder?: boolean;
  sourceId?: string;
  episode?: number;
  season?: number;
	path?: string;
}