import styled from 'styled-components';
import { Button, TextField } from '@mui/material';
import { ProgressLoader } from '~app/styles';

export const Year = styled(ProgressLoader)`
  font-size: 16px;
  width: 50px;
  min-height: 20px;
`;

export const ShowContent = styled.div`
  display: flex;
  margin-top: -15px;
`;

export const ImageContainer = styled(ProgressLoader)`
  width: 200px;
  min-height: 250px;
`;

export const ShowImage = styled.img`
  width: 200px;
  box-shadow: 0 0 2px #aaa;
`;

export const ShowDescription = styled(ProgressLoader)`
  width: 400px;
  margin-left: 50px;
`;

export const ShowTitle = styled(ProgressLoader)`
  display: flex;
  justify-content: space-between;
`;

export const EditTitle = styled(TextField)`
  &.edit-title {
    .MuiOutlinedInput-root {
      letter-spacing: 0;
    }

    fieldset {
      border: 0;
    }

    input {
      font-size: 32px;
      height: auto;
      padding: 0;
    }
  }
`;

export const EditButton = styled(Button)`
  &.edit-button {
    padding: 2px;
    margin: 2px 6px 0 0;
    min-width: 40px;
  }
`;

export const ResourceButton = styled(Button)`
  &.resource-item {
    font-size: 12px;
    background: white;
    border: 1px solid;
    color: ${({ theme }) => theme?.colors?.border?.santasGray};
    border-color: ${({ theme }) => theme?.colors?.border?.santasGray};
    padding: 0 5px;
    margin: 1px;
    min-width: auto;

    :hover {
      color: ${({ theme }) => theme?.colors?.primary};
      border-color: ${({ theme }) => theme?.colors?.primary};
    }
  }
`;
