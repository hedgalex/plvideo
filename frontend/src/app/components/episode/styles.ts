import styled from 'styled-components';
import DownloadIcon from '@mui/icons-material/Download';
import { Box } from '@mui/material';

export const EpisodeItem = styled.div`
  position: relative;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 25px;
  background: white;
  :hover {
    outline: 1px solid #eee;
  }
`;

export const ItemImage = styled.img`
  position: absolute;
  bottom: -5px;
  left: 60px;
  width: 47px;
  height: 70px;
  background: #eee;
  border: 4px solid #eee;
  border-radius: 10px;
`;

export const Info = styled.div`
  display: flex;
`;

export const Progress = styled(Box)`
  width: 35px;
`;

export const Download = styled(DownloadIcon)`
  margin: 8px;
`;

export const Details = styled.div`
  cursor: pointer;
  flex-grow: 1;
  font-size: 16px;
  margin: 2px 10px 2px 85px;
  height: 38px;
`;

export const Title = styled.div`
  color: black;
  font-weight: 600;
`;

export const Subtitle = styled.div`
  margin-top: 4px;
  color: black;
`;

export const Action = styled.div`
  width: 36px;
  height: 36px;
  margin: 2px 8px;
  border-radius: 40%;
  border: 1px solid #a0a2af;

  :hover {
    border-color: #4756ea;
  }
`;
