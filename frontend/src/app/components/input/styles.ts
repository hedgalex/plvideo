import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Input = styled(TextField)`
  width: 450px;

  .MuiInputBase-sizeSmall {
    border: 1px solid #e6eaf3;
    border-radius: 10px;
    background: white;

    :hover {
      border-color: #4756ea;
      outline: 4px solid #d6dffd;
    }
  }
`;
