import { PropsWithChildren } from 'react';
import { Box } from '@mui/material';
import { PageStyles, RollerStyles } from './styles';

interface RollerProps {
  id?: number;
  position?: number;
}

export const Roller: React.FC<PropsWithChildren<RollerProps>> = ({ children, position = 0 }) => {
  return (
    <RollerStyles position={position}>
      <Box>{children}</Box>
    </RollerStyles>
  );
};

export { PageStyles as Page };
