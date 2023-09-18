import { useEffect, useState } from 'react';
import { ISourceContentItem } from '~shared/.ifaces';
import { EFileTypes } from '~shared/.consts';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import SubtitlesIcon from '@mui/icons-material/Subtitles';
import { Col, SourceListItem, SourceListPaper } from '../../styles';

interface SourceListProps {
  items?: ISourceContentItem[];
  onClick?: (sourceId: number) => void;
  onSelect?: (fileIds: number[]) => void;
}

// Function to display the appropriate icon based on the type
function displayIcon(type = 'file'): JSX.Element {
  switch (type) {
    case EFileTypes.FOLDER:
      return <FolderIcon />;
    case EFileTypes.MOVIE:
      return <LocalMoviesIcon />;
    case EFileTypes.SUBTITLES:
      return <SubtitlesIcon />;
    default:
      return <InsertDriveFileIcon />;
  }
}

export const SourceDetailsList: React.FC<SourceListProps> = ({ items, onClick, onSelect }) => {
  const [selectedIds, setSelectedIds] = useState(new Set<number>());

  const addSelectedId = (id: number) => {
    setSelectedIds((prev) => new Set(prev).add(id));
  };

  const removeSelectedId = (id: number) => {
    setSelectedIds((prev) => {
      const newSelectedIds = new Set(prev);
      newSelectedIds.delete(id);
      return newSelectedIds;
    });
  };

  const handleClick = (id: number) => {
    if (selectedIds.has(id)) {
      removeSelectedId(id);
    } else {
      addSelectedId(id);
    }
  };

  useEffect(() => {
    onSelect?.(Array.from(selectedIds));
  }, [selectedIds]);

  return (
    <SourceListPaper>
      {items?.map(({ id = 0, type, isFolder, name, size = '' }) => (
        <SourceListItem
          key={id}
          isSelected={selectedIds.has(id)}
          onClick={() => {
            if (!isFolder) {
              handleClick(id);
            }
          }}
        >
          <Col type="icon">{displayIcon(isFolder ? 'folder' : type)}</Col>
          <Col
            type="name"
            onClick={() => {
              onClick?.(id);
            }}
          >
            {name}
          </Col>
          <Col type="size">{size}</Col>
        </SourceListItem>
      ))}
    </SourceListPaper>
  );
};
