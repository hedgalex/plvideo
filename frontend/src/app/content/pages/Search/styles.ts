import { Box, Chip } from '@mui/material';
import styled from 'styled-components';

export const SearchContainer = styled(Box)`
  margin-bottom: 50px;
`;

export const StyledChip = styled(Chip)<{ isSelected: boolean }>`
  &.chip-label {
    cursor: pointer;
		color: white;
		background: ${({ isSelected, theme }) => (isSelected ? theme?.colors.primary : theme?.colors.border.santasGray)}};

		&:hover {
			background-color: ${({ isSelected, theme }) => (isSelected ? 'blue' : 'green')}};	
		}	
  }
`;
