import { Typography } from '@mui/material';
import styled from 'styled-components';

export const Year = styled.div`
  font-size: 16px;
`;

export const ShowContent = styled.div`
  display: flex;
  margin-top: -15px;
`;

export const ShowImage = styled.img`
  width: 200px;
  box-shadow: 0 0 2px #aaa;
`;

export const ShowDescription = styled(Typography)`
  width: 400px;
  padding-left: 50px;
  background: #edc;
`;

export const ShowData = styled.div`
  display: flex;
`;
