import styled from 'styled-components';
import { Button, TextField, MenuItem } from '@mui/material';
import { ProgressLoader } from '~app/styles';

export const Year = styled(ProgressLoader)`
  font-size: 16px;
  width: 50px;
  min-height: 20px;
  margin-top: -75px;

  @media only screen and (max-width: 768px) {
    margin-top: -20px;
  }
`;

export const ShowContent = styled.div`
  display: flex;
  margin-top: -15px;
`;

export const ImageContainer = styled(ProgressLoader)`
  width: 200px;
  min-height: 250px;

  @media only screen and (max-width: 768px) {
    width: 100px;
    min-height: 150px;
  }
`;

export const ShowImage = styled.img`
  width: 200px;
  box-shadow: 0 0 2px #aaa;

  @media only screen and (max-width: 768px) {
    width: 100px;
  }
`;

export const ShowDescription = styled(ProgressLoader)`
  width: 400px;
  margin-left: 50px;

  @media only screen and (max-width: 768px) {
    width: auto;
    margin-left: 10px;
    font-size: 14px;
  }
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

  @media only screen and (max-width: 768px) {
    &.edit-title {
      input {
        font-size: 20px;
      }
    }
  }
`;

export const EditButton = styled(Button)`
  &.edit-button {
    padding: 2px;
    margin: 2px 6px 0 0;
    min-width: 40px;
  }

  @media only screen and (max-width: 768px) {
    &.edit-button {
      padding: 2px;
      min-width: 25px;
      margin: 2px 6px 0 0;
    }
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

export const ShowButton = styled(Button)`
  &.show-button {
    margin: 0 2px 8px 0;
    border: 0;
    color: #a0a2af;
    padding: 2px;
    min-width: 45px;
    height: 30px;
    background: transparent;

    :hover {
      border: 0;
      color: #4756ea;
      background: transparent;
    }
  }
`;

export const DeleteMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    color: red;
  }
`;
