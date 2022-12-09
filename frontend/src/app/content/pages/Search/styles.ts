import { Box, Chip } from '@mui/material';
import styled from 'styled-components';
import { IGlobalTheme } from '../../../theme';

export const SearchContainer = styled(Box)`
  margin-bottom: 50px;
`;

export const StyledChip = styled(Chip)`
  &.MuiChip-sizeSmall {
    cursor: pointer;
		color: white;
		background: ${({ isActive, theme }: IGlobalTheme<{ isActive: boolean }>) =>
      isActive ? theme?.colors.primary : theme?.colors.bg.inactive}};

		:hover {
			background: ${({ isActive, theme }: IGlobalTheme<{ isActive: boolean }>) =>
        isActive ? theme?.colors.primary : 'rgb(0 0 0 / 30%)'}};	
		}	
  }
`;
