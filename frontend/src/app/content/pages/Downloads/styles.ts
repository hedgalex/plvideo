import styled from 'styled-components';

export const GroupButton = styled.div<{ isActive: boolean }>`
  padding: 8px;
  background: ${({ isActive }) => (isActive ? '#edfaed' : '#f0f0f0')};
  cursor: pointer;
  margin: 20px;
  border-radius: 12px;
  outline: 1px solid transparent;
  color: #555;
  font-size: 14px;

  &:hover {
    outline: 1px solid #eee;
  }
`;
