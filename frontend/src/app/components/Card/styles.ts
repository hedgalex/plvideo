import styled from 'styled-components';
import { Box } from '@mui/material';
import { GlobalTheme } from '~app/theme';
import { VisibilityProps } from '~app/styles';

interface ShiftProps {
  shift: number;
}

interface ProgressProps {
  progress?: number;
}

// Card styles
const CardWrapper = styled.div`
  margin-bottom: 20px;
`;

const CardProgress = styled.div<ProgressProps>(
  ({ theme, progress = 0 }) => `
  background: linear-gradient(0deg, ${theme?.colors.palette.primary_100} ${progress}%, ${theme?.colors.palette.secondary_50} ${progress}%);
  border-radius: 12px;
  padding: 0 7px 0 0;
`,
);

const CardContainer = styled.div(
  ({ theme }) => `
	display: flex;
  position: relative;
	border: 1px solid transparent;
	padding: 10px;
	border-radius: 12px;
	transition: all 0.2s ease-in-out;
  background: ${theme?.colors.palette.secondary_50};

  &:hover .actions {
    opacity: 1;
  }

  &:hover {
    background: ${theme?.colors.palette.primary_50};
    border-color: ${theme?.colors.palette.primary_100};
  }
`,
);

export const CardStyles = {
  Wrapper: CardWrapper,
  Container: CardContainer,
  Progress: CardProgress,
};

// Title styles
const TitleWrapper = styled.div`
  flex-grow: 1;
  height: 45px;
  margin-left: 100px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
  cursor: pointer;
`;

const TitleText = styled.div`
  font-weight: 600;
`;

const TitleSubText = styled.div`
  margin-top: 5px;
`;

export const TitleStyles = {
  Wrapper: TitleWrapper,
  Text: TitleText,
  SubText: TitleSubText,
};

// Preview styles
export const PreviewImage = styled.img<VisibilityProps>(
  ({ theme, isVisible = true }: GlobalTheme<VisibilityProps>) => `
  display: ${isVisible ? 'block' : 'none'};
  width: 47px;
  height: 70px;
  position: absolute;
  bottom: 2px;
  left: 50px;
  z-index: 2;
  border-radius: 8px;
  box-shadow: 0 0 4px ${theme?.colors.palette.blue_11};
  outline: 1px solid ${theme?.colors.palette.white};
  background: ${theme?.colors.palette.blue_1};
`,
);

// Rating styles
const RatingContainer = styled.div<VisibilityProps>(
  ({ isVisible }) => `
  display: ${isVisible ? 'flex' : 'none'};
  position: absolute;
  top: 16px;
  left: 15px;
  flex-direction: column;
  cursor: default;
  align-items: center;
`,
);

const RatingScore = styled(Box)`
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  cursor: default;
`;

const Arrow = styled.div(
  ({ theme }) => `
  display: inline-block;
  width: 18px;
  height: 9px;
  background: ${theme?.colors.palette.secondary_100};
`,
);

const RatingArrowUp = styled(Arrow)<ShiftProps>(
  ({ shift, theme }) => `
  clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
  ${shift > 0 && `background: ${theme?.colors.palette.success_300}`};
`,
);

const RatingArrowDown = styled(Arrow)<ShiftProps>(
  ({ shift, theme }) => `
  clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
  ${shift < 0 && `background: ${theme?.colors.palette.error_300}`};
`,
);

export const RatingStyles = {
  Container: RatingContainer,
  Score: RatingScore,
  ArrowUp: RatingArrowUp,
  ArrowDown: RatingArrowDown,
};

// Actions styles
export const Actions = styled.div`
  display: flex;
`;
