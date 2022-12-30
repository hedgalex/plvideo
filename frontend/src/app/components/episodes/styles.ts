import { Button } from '@mui/material';
import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const SeasonsTitle = styled.div`
  margin: 0 5px 0 56px;
  padding-top: 3px;
  margin-right: 10px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

export const SeasonButton = styled(Button)<{ isSelected: boolean }>`
  &.season-button {
    margin: 0 2px 8px 0;
    border: 1px solid ${({ isSelected }) => (isSelected ? '#4756ea' : '#a0a2af')};
    color: ${({ isSelected }) => (isSelected ? '#4756ea' : '#a0a2af')};
    padding: 2px;
    min-width: 45px;
    height: 30px;

    :hover {
      border: 1px solid #4756ea;
      color: #4756ea;
    }
  }
`;

export const EpisodeGroupsBlock = styled.div`
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
