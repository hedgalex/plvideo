import { useMemo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { EResource } from '~shared/.consts';
import { DeleteMenuItem, ShowButton } from '../styles';

interface IMoreButtonProps {
  resources: EResource[];
  lastUpdate?: number | string;
  onDelete: () => void;
  onUpdate: (resource: EResource) => void;
  onTypeChange: () => void;
}

export const MoreButton: React.FC<IMoreButtonProps> = ({ lastUpdate, resources, onDelete, onUpdate, onTypeChange }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const lastUpdateTime = useMemo(() => {
    if (!lastUpdate) {
      return '';
    }
    return new Date(parseInt(lastUpdate.toString(), 10)).toLocaleString('en-NZ');
  }, [lastUpdate]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogConfirm = () => {
    onDelete?.();
    setDialogOpen(false);
  };

  const handleChangeTypeClick = () => {
    onTypeChange?.();
    handleClose();
  };

  const handleDeleteClick = () => {
    handleClose();
    setDialogOpen(true);
  };

  const handleUpdateClick = (resource: EResource) => () => {
    onUpdate?.(resource);
    handleClose();
  };

  return (
    <>
      <ShowButton
        className="show-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        disableRipple
      >
        <MoreVertIcon />
      </ShowButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ 'aria-labelledby': 'basic-button' }}
      >
        <MenuItem disabled>{lastUpdateTime}</MenuItem>
        {resources?.map((resource) => (
          <MenuItem onClick={handleUpdateClick(resource)}>Update {resource}</MenuItem>
        ))}
        <MenuItem onClick={handleChangeTypeClick}>Change type</MenuItem>
        <DeleteMenuItem onClick={handleDeleteClick}>Delete</DeleteMenuItem>
      </Menu>
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle />
        <DialogContent>You sure you wanna delete the show?</DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>No way</Button>
          <Button onClick={handleDialogConfirm} style={{ color: 'red' }}>
            Of course
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
