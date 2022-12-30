import { Box } from '@mui/material';
import { ETaskStatus } from '~shared/.consts';
import { Download, ProgressBlock } from '../styles';

export interface IProgressProps {
  downloaded?: number;
  status?: ETaskStatus;
}

export const Progress: React.FC<IProgressProps> = ({ downloaded = 0, status = ETaskStatus.NONE }) => {
  if (status === ETaskStatus.NONE) {
    return <></>;
  }

  return (
    <ProgressBlock>
      <Box fontSize="12px">{downloaded}%</Box>
      <Download completed={downloaded} />
    </ProgressBlock>
  );
};
