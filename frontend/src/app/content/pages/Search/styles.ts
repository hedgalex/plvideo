import { Box, Chip } from '@mui/material';
import styled from 'styled-components';

export const SearchContainer = styled(Box)`
  margin-bottom: 50px;
`;

export const StyledChip = styled(Chip)<{ isSelected?: boolean }>`
  &.chip-label {
    cursor: pointer;
		color: white;
		background: ${({ isSelected, theme }) => (isSelected ? theme?.colors.primary : theme?.colors.bg.inactive)}};

		:hover {
			background: ${({ isSelected, theme }) => (isSelected ? theme?.colors.primary : 'rgb(0 0 0 / 30%)')}};	
		}	
  }
`;
