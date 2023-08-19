import { useState } from 'react';
import { ISourceContentItem } from '~shared/.ifaces';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Col, SourceListItem, SourceListPaper } from '../styles';

interface SourceListProps {
  items?: ISourceContentItem[];
  onClick?: (sourceId: number) => void;
}

export const SourceDetailsList: React.FC<SourceListProps> = ({ items, onClick }) => {
  const [selectedIds, setSelectedIds] = useState(new Set());

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

  return (
    <SourceListPaper>
      {items?.map(({ id = 0, name, isFolder, size = '' }) => (
        <SourceListItem
          key={id}
          isSelected={selectedIds.has(id)}
          onClick={() => {
            if (!isFolder) {
              handleClick(id);
            }
          }}
        >
          <Col type="icon">{isFolder ? <FolderIcon /> : <InsertDriveFileIcon />}</Col>
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
