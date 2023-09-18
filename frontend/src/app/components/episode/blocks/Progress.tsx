import { Box } from '@mui/material';
import { EStatus } from '~shared/.consts';
import { Download, ProgressBlock } from '../styles';

export interface IProgressProps {
  downloaded?: number;
  status?: EStatus;
}

export const Progress: React.FC<IProgressProps> = ({ downloaded = 0, status = EStatus.NONE }) => {
  if (status === EStatus.NONE) {
    return <></>;
  }

  return (
    <ProgressBlock>
      <Box fontSize="12px">{downloaded}%</Box>
      <Download completed={downloaded} />
    </ProgressBlock>
  );
};
