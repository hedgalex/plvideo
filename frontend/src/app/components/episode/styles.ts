import styled from 'styled-components';
import { IGlobalTheme } from '~app/theme';
import { ETaskStatus } from '~shared/.consts';
import { ProgressLoader, Spinner } from '~app/styles';

export const EpisodeItem = styled(ProgressLoader)`
  position: relative;
  border-radius: 16px;
  padding: 10px;
  margin-bottom: 25px;

  :hover {
    outline: 1px solid #eee;
  }

  ${({ loading = false }) => !loading && `background: white;`}
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

export const StatisticsBlock = styled.div`
  width: 50px;
  height: 40px;
  margin-left: -4px;
  cursor: default;
  overflow: hidden;
`;

export const Download = styled.div`
  display: inline-block;
  width: 26px;
  height: 20px;
  background: ${({ completed }: IGlobalTheme<{ completed: number }>) =>
    `linear-gradient(0deg, #aaccee ${completed}%, #eee, #eee)`};
  clip-path: polygon(18% 0%, 88% 0%, 82% 50%, 100% 50%, 50% 100%, 0% 50%, 18% 50%);
`;

interface IDetailsProps {
  allowClick: boolean;
  hasImage: boolean;
}

export const NamesBlock = styled.div`
  flex-grow: 1;
  font-size: 16px;
  height: 38px;
  cursor: ${({ allowClick }: IGlobalTheme<IDetailsProps>) => (!allowClick ? 'default' : 'pointer')};
  margin: 2px 10px 2px ${({ hasImage }: IGlobalTheme<IDetailsProps>) => (hasImage ? '73px' : '15px')};
`;

export const Title = styled.div`
  max-width: 625px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
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
  box-sizing: border-box;
  padding: 5px;
  border-radius: 40%;
  border: 1px solid #a0a2af;
  color: #a0a2af;
  cursor: pointer;

  :hover {
    border-color: ${({ status }: IGlobalTheme<{ status: ETaskStatus }>) =>
      status === ETaskStatus.IDLE || status === ETaskStatus.NONE ? '#4756ea' : 'red'};
    color: ${({ status }: IGlobalTheme<{ status: ETaskStatus }>) =>
      status === ETaskStatus.IDLE || status === ETaskStatus.NONE ? '#4756ea' : 'red'};
  }
`;

export const StyledSpinner = styled(Spinner)`
  margin: 6px 12px 0 0;
  width: 25px;
  height: 25px;
`;

export const SizeBlock = styled.div`
  color: #a0a2af;
  margin: 12px 10px 0 0;
  font-size: 14px;
`;

export const RatingIncline = styled.span<{ incline: number }>`
  color: ${({ incline }) => (incline > 0 ? 'green' : 'red')};
  padding-top: ${({ incline }) => (incline > 0 ? '2px' : '9px')};
  text-align: center;
`;

export const PopularityIndex = styled.span`
  margin-top: 10px;
`;
