import { Tooltip, Zoom } from '@mui/material';
import UpdateIcon from '@mui/icons-material/Update';
import { EResource } from '~shared/.consts';
import { LightTooltip } from './LighTooltip';
import { ResourceButton } from '../styles';
import { useMemo } from 'react';

interface IUpdateButtonProps {
  onClick: (resource: EResource) => void;
  resources: EResource[];
  lastUpdate?: number | string;
}

export const UpdateButton: React.FC<IUpdateButtonProps> = ({ lastUpdate, resources, onClick }) => {
  const lastUpdateTime = useMemo(() => {
    if (!lastUpdate) {
      return '';
    }
    return new Date(parseInt(lastUpdate.toString(), 10)).toLocaleString('en-NZ');
  }, [lastUpdate]);

  const handleClick = (resource: EResource) => () => {
    onClick(resource);
  };

  return (
    <LightTooltip
      title={
        <>
          {resources?.map((resource) => (
            <ResourceButton key={resource} className="resource-item" onClick={handleClick(resource)}>
              {resource}
            </ResourceButton>
          ))}
        </>
      }
      TransitionComponent={Zoom}
      placement="bottom"
      className="update-popper"
    >
      <Tooltip title={`Last update: ${lastUpdateTime}`} TransitionComponent={Zoom} placement="top">
        <UpdateIcon />
      </Tooltip>
    </LightTooltip>
  );
};
