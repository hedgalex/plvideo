import { Button } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const SeasonButton = styled(Button)<{ isSelected: boolean }>`
  &.season-button {
    margin: 0 2px;
    border: 1px solid ${({ isSelected }) => (isSelected ? '#4756ea' : '#a0a2af')};
    color: ${({ isSelected }) => (isSelected ? '#4756ea' : '#a0a2af')};
    padding: 2px;
    min-width: 45px;

    :hover {
      border: 1px solid #4756ea;
      color: #4756ea;
    }
  }
`;

export const EpisodeGroups = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px 0;
`;

export const EpisodeGroup = styled.div<{ selected: boolean }>`
  text-align: center;
  width: 75px;
  margin-right: 10px;
  margin-bottom: 8px;
  white-space: nowrap;
  padding: 5px;
  cursor: pointer;
  outline: 1px solid ${({ selected }) => (selected ? '#a6a8b5' : '#eee')};
  border-radius: 6px;
`;
