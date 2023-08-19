import { TextField } from '@mui/material';
import styled from 'styled-components';

export const Input = styled(TextField)(
  ({ theme }) => `
  width: 450px;

  .MuiInputBase-sizeSmall {
    box-shadow: 0px 1px 6px ${theme?.colors.palette.primary_100},inset 0px 2px 8px ${theme?.colors.palette.secondary_50};
    border-radius: 12px;
    background: white;
    border: 1px solid ${theme?.colors.palette.primary_200};

    :focus-within, :hover {
      border: 1px solid ${theme?.colors.palette.primary_300};
    }
  }

  .MuiOutlinedInput-notchedOutline {
    border: 0;

    :hover {
      border: 1px solid ${theme?.colors.palette.primary_300};
    }
  }

  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`,
);
