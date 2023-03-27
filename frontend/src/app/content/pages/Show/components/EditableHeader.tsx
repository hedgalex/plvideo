import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { EditButton, EditTitle } from '../styles';
import { Box } from '@mui/material';
import { Header } from '~app/content/styles';

interface IEditableTitleProps {
  onChange: (value: string) => void;
  title: string;
}

export const EditableTitle: React.FC<IEditableTitleProps> = ({ title, onChange }) => {
  const [titleText, setTitleText] = useState<string>('');
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleHeaderClick = () => {
    setEditMode(true);
  };

  const handleSaveTitle = useCallback(() => {
    setEditMode(false);
    onChange(titleText);
  }, [titleText]);

  const handleCancelEditingTitle = useCallback(() => {
    setEditMode(false);
    setTitleText(title ?? '');
  }, [title]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitleText(event.target?.value ?? '');
  };

  const handleChangeEditMode = useCallback(
    (event: { key: string }) => {
      if (editMode && event.key === 'Escape') {
        handleCancelEditingTitle();
      }
      if (editMode && event.key === 'Enter') {
        handleSaveTitle();
      }
    },
    [editMode],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleChangeEditMode);

    return () => {
      document.removeEventListener('keydown', handleChangeEditMode);
    };
  }, [editMode]);

  useEffect(() => {
    if (title) {
      setTitleText(title);
    }
  }, [title]);

  return (
    <Box display="flex" justifyContent="space-between">
      {editMode && (
        <Header variant="h1">
          <EditTitle className="edit-title" value={titleText} onChange={handleChange} />

          <EditButton className="edit-button" color="success" variant="outlined" onClick={handleSaveTitle}>
            <CheckIcon />
          </EditButton>
          <EditButton className="edit-button" color="error" variant="outlined" onClick={handleCancelEditingTitle}>
            <CloseIcon />
          </EditButton>
        </Header>
      )}
      {!editMode && (
        <Header variant="h1" onClick={handleHeaderClick}>
          {titleText}
        </Header>
      )}
    </Box>
  );
};
