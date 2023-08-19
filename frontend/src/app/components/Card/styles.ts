import { Box } from '@mui/material';
import styled from 'styled-components';
import { GlobalTheme } from '~app/theme';

export const Wrapper = styled.div(
  () => `
	margin-bottom: 20px;
`,
);

export const Progress = styled.div<{ progress: number }>(
  ({ theme, progress }) => `
  background: linear-gradient(0deg, ${theme?.colors.palette.primary_100} ${progress}%, ${theme?.colors.palette.secondary_50} ${progress}%);
  border-radius: 12px;
  padding: 0 7px 0 0;
`,
);

export const Container = styled.div<{ isSelected: boolean }>(
  ({ theme, isSelected }: GlobalTheme<{ isSelected: boolean }>) => `
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

  ${(() => {
    if (isSelected) {
      return `
        box-shadow: 0px 1px 6px ${theme?.colors.palette.primary_100},inset 0px 2px 8px ${theme?.colors.palette.secondary_50};
				border-color: ${theme?.colors.palette.primary_light};
				background: ${theme?.colors.palette.white};
			`;
    } else {
      return `
				&:hover {
					background: ${theme?.colors.palette.primary_50};
					border-color: ${theme?.colors.palette.primary_100};
				}
			`;
    }
  })()}
`,
);

export const Icon = styled.img<{ isVisible: boolean; isInFullMode: boolean }>(
  ({ theme, isVisible, isInFullMode }: GlobalTheme<{ isVisible: boolean; isInFullMode: boolean }>) => `
  display: ${isVisible ? 'block' : 'none'};
	position: absolute;
	bottom: ${isInFullMode ? '-166px' : '2px'};
	left: ${isInFullMode ? '30px' : '45px'};
	width: ${isInFullMode ? '100px' : '47px'};
	height: ${isInFullMode ? '150px' : '70px'};
	border-radius: ${isInFullMode ? '15px' : '8px'};
  box-shadow: 0 0 4px ${theme?.colors.palette.blue_11};
  outline: 1px solid ${theme?.colors.palette.white};
  transition: all 0.3s ease-in-out;
`,
);

export const Title = styled.div`
  height: 45px;
  margin-left: 76px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: black;
  cursor: pointer;
  flex-grow: 1;
`;

export const Header = styled.div`
  font-weight: 600;
`;

export const SubHeader = styled.div`
  margin-top: 5px;
`;

export const Actions = styled.div`
  display: flex;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
`;

export const Subsection = styled.div<{ isOpen: boolean }>(
  ({ theme, isOpen }: GlobalTheme<{ isOpen: boolean }>) => `
	border-width: 0 1px 1px 1px;
  border-style: solid;
  border-radius: 5px 5px 12px 12px;
  margin: 0 15px 0 10px;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;

  border-color: ${isOpen ? theme?.colors.palette.secondary_300 : 'transparent'};
  background: ${isOpen ? theme?.colors.palette.white : 'transparent'};
  min-height: ${isOpen ? '200px' : '0'};
  transition: all 0.3s ease-in-out;
`,
);

export const Button = styled.div<{ variant: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' }>(
  ({ theme, variant = 'primary' }) => `
  display: flex;
  width: 30px;
  height: 30px;
  padding: 5px;
  margin-right: 5px;
  border-radius: 40%;
  align-items: center;
  cursor: pointer;
  svg {
    transition: transform 0.2s ease-in-out;
    margin: 0 auto;
  }

  color: ${theme?.colors.palette.secondary_300};
  border: 1px solid ${theme?.colors.palette.secondary_300};

  ${(() => {
    switch (variant) {
      case 'secondary':
        return `
          &:hover {
            color: ${theme?.colors.palette.secondary_500};
            border-color: ${theme?.colors.palette.secondary_500};
          }
        `;
      case 'danger':
        return `
          &:hover {
            color: ${theme?.colors.palette.error_500};
            border-color: ${theme?.colors.palette.error_500};
          }
        `;
      case 'success':
        return `
          &:hover {
            color: ${theme?.colors.palette.success_500};
            border-color: ${theme?.colors.palette.success_500};
          }
        `;
      case 'warning':
        return `
          &:hover {
            color: ${theme?.colors.palette.warning_500};
            border-color: ${theme?.colors.palette.warning_500};
          }
        `;
      default:
        return `
          &:hover {
            color: ${theme?.colors.palette.primary_500};
            border-color: ${theme?.colors.palette.primary_500};
          }
        `;
    }
  })()}
`,
);

export const ExpandButton = styled(Button)<{ isExpanded: boolean }>(({ isExpanded }) => {
  if (isExpanded) {
    return `
      svg {
        transform: rotate(90deg);
      }
    `;
  }
});

export const StatContainer = styled.div<{ isVisible: boolean; type: 'default' | 'additional' }>(
  ({ isVisible, type }) => `
  display: flex;
  flex-direction: column;
  visibility: ${isVisible ? 'visible' : 'hidden'};
  margin: ${type === 'additional' ? '-5px 14px' : '6px 3px'};
  cursor: default;

  span {
    text-align: center;
    font-size: 12px;
    margin: 4px;
  }
`,
);

export const Score = styled(Box)`
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

export const ArrowUp = styled(Arrow)<{ shift: number; type?: 'above' | 'aside' }>(
  ({ shift, type, theme }) => `
  clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
  ${shift > 0 && `background: ${theme?.colors.palette.success_300}`};

  ${(() => {
    if (type === 'aside') {
      return `
        width: 9px;
        height: 5px;
        transform: translate(-10px, 6px);
      `;
    }
  })()}
`,
);

export const ArrowDown = styled(Arrow)<{ shift: number; type?: 'under' | 'aside' }>(
  ({ shift, type, theme }) => `
  clip-path: polygon(0% 0%, 50% 100%, 100% 0%);
  ${shift < 0 && `background: ${theme?.colors.palette.error_300}`};

  ${(() => {
    if (type === 'aside') {
      return `
        width: 9px;
        height: 5px;
        transform: translate(-10px, -6px);
      `;
    }
  })()}
`,
);

export const AdditionalStatsWrapper = styled.div`
  position: absolute;
  top: 240px;
  left: 30px;
  width: 100px;
  overflow: hidden;
  text-align: center;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  font-weight: bold;
`;
