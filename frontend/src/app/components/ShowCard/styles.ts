import styled from 'styled-components';
import { Box, Button as MuiButton } from '@mui/material';
import { GlobalTheme } from '~app/theme';
import { Card } from '../Card';
import { ActiveProps, Button, SelectedProps, VisibilityProps } from '~app/styles';
import { Rating } from '../Card/components/Rating';
import { PreviewImage, RatingStyles } from '../Card/styles';

interface Expanding {
  isExpanding?: boolean;
}

export const CardContent = styled.div`
  position: relative;
`;

export const Pages = styled.div<{ position: number }>(
  ({ position }) => `
  position: relative;
  margin: 15px 15px 15px 128px;
  overflow: hidden;
  height: 100%;
  box-sizing: border-box;

  & > div {
    display: flex;
    width: 200%;
    height: calc(100% - 30px);  
    transform: translateX(${position === 0 ? '0' : '-50%'});
    transition: transform 0.3s ease-in-out;
    box-sizing: border-box;
    & > div {
      width: 100%;
      height: 100%;  
    }
  }
`,
);

export const SourceListContainer = styled.div`
  display: flex;
  padding: 2px 10px 0 0;
`;

export const SourceListPaper = styled.ul`
  padding: 0;
  margin: 0 2px 0 0;
  list-style: none;
  flex-grow: 1;
`;

export const SourceListItem = styled.li<{ isSelected?: boolean }>(
  ({ theme, isSelected }: GlobalTheme<{ isSelected?: boolean }>) => `
  display: flex;
  font-size: 14px;
  orientation: horizontal;
  cursor: default;
  border-radius: 5px;
  border: 1px solid transparent;
  margin-bottom: 1px;
  background: ${isSelected ? theme?.colors.palette.secondary_50 : 'transparent'};

  svg {
    color: ${theme?.colors.palette.secondary_300};
    width: 14px;
    height: 14px;

  }

  :hover {
    border-color: ${theme?.colors.palette.primary_100};
    box-shadow: 0px 0px 2px ${theme?.colors.palette.primary_100},
      inset 0px 0px 2px ${theme?.colors.palette.secondary_50};

    svg {
      color: ${theme?.colors.palette.primary_300};
    }
  }
`,
);

export const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

export const BackButton = styled(MuiButton)(
  ({ theme }) => `
  &.MuiButtonBase-root {
    width: 16px;
    min-width: 0;
    height: 100%;
    font-size: 14px;
    border-radius: 15px;
    border: 1px solid ${theme?.colors.palette.secondary_300};
    background: ${theme?.colors.palette.secondary_50};
    margin-right: 3px;

    :hover {
        border-color: ${theme?.colors.palette.primary_300};
        background: ${theme?.colors.palette.secondary_50};
        
        & > svg {
          color: ${theme?.colors.palette.primary_300};
        }
      }
  }
  
  & > svg {
    width: 16px;
    height: 16px;
    transform: rotate(90deg);
    color: ${theme?.colors.palette.secondary_300};
  }
`,
);

export const Col = styled(Box)<{ type: 'name' | 'size' | 'peers' | 'seeds' | 'icon' | 'default' }>(
  ({ type, theme }: GlobalTheme<{ type: 'name' | 'size' | 'peers' | 'seeds' | 'icon' | 'default' }>) => `
  padding: 0;
  margin: 4px;
  text-align: left;
  
  ${(() => {
    switch (type) {
      case 'name':
        return `
          text-align: left;
          flex-grow: 1;
          cursor: pointer;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          width: 300px;
        `;
      case 'size':
        return `
          width: 60px;
          padding: 0 4px;
          font-size: 13px;
          color: ${theme?.colors.palette.secondary_500};
        `;
      case 'peers':
        return `
          width: 25px;
          padding-right: 8px;
          color: ${theme?.colors.palette.success_500};
      `;
      case 'seeds':
        return `
          width: 25px;
          color: ${theme?.colors.palette.primary_500};
        `;
      case 'icon':
        return `
          width: 20px;
        `;
      default:
        return `
          text-align: center;
          cursor: pointer;
        `;
    }
  })()}
`,
);

export const Lists = styled.div(
  () => `
  display: flex;
  align-items: center;
`,
);

const SourceIcon = styled.div`
  width: 8px;
  border-radius: 9px;
  margin-right: 3px;
`;

export const IconOroro = styled(SourceIcon)`
  background: #edc;
`;
export const IconTorrent = styled(SourceIcon)`
  background: #cae;
`;
export const IconAc = styled(SourceIcon)`
  background: #aca;
`;

export const Container = styled.div<{ center?: boolean }>(({ center = false }) => {
  if (center) {
    return `
        display: flex;
        justify-content: center;
        text-align: center;
        align-items: center;
        width: 100%;
        height: 100%;
      `;
  }

  return `
    overflow: auto;
    width: 100%;
    height: 100%;
  `;
});

export const CardStyled = styled(Card)<SelectedProps>(
  ({ theme, isSelected = false }) => ` 
  margin-bottom: 0;

  ${(() => {
    if (isSelected) {
      return `
        .card-container {
          box-shadow: 0px 1px 6px ${theme?.colors.palette.primary_100},inset 0px 2px 8px ${theme?.colors.palette.secondary_50};
          border-color: ${theme?.colors.palette.primary_light};
          background: ${theme?.colors.palette.white};
        }
			`;
    }
  })()}
`,
);

export const ButtonContainer = styled(Button)<ActiveProps>(({ isActive = false }) => {
  if (isActive) {
    return `
      svg {
        transform: rotate(90deg);
      }
    `;
  }
});

export const ExpandingImage = styled(PreviewImage)<Expanding>(({ isExpanding }) => {
  if (isExpanding) {
    return `
      bottom: -165px;
      left: 30px;
      width: 100px;
      height: 150px;
      border-radius: 15px;
      transition: all 0.4s ease;
      `;
  }

  return `
    transition: all 0.5s ease;
  `;
});

export const Year = styled.div(
  ({ theme }: GlobalTheme) => `
  cursor: default;
  position: absolute;
  top: 20px;
  left: 28px;
  font-size: 12px;
  font-weight: 600;
  text-shadow: 0 0 2px ${theme?.colors.palette.black};
  color: ${theme?.colors.palette.white};
  z-index: 2;
  opacity: 0;
`,
);

export const Score = styled.div`
  cursor: default;
  position: absolute;
  top: 167px;
  left: 80px;
  font-size: 12px;
  font-weight: 600;
  font-size: 12px;
  font-weight: 600;
  margin-top: 5px;
  width: 32px;
  text-align: right;
  opacity: 0;
`;

export const RatingShift = styled(Rating)`
  position: absolute;
  top: 167px;
  left: 25px;
  opacity: 0;
  align-items: end;

  ${RatingStyles.ArrowUp} {
    width: 9px;
    height: 5px;
    transform: translate(10px, 7px);
  }

  ${RatingStyles.ArrowDown} {
    width: 9px;
    height: 5px;
    transform: translate(10px, -6px);
  }
`;

export const Attachment = styled.div<VisibilityProps>(
  ({ theme, isVisible = true }) => `
  position: relative;
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-radius: 2px 2px 12px 12px;
  margin: 0 15px 0 10px;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden;
  height: 200px;
  border-color: ${isVisible ? theme?.colors.palette.secondary_300 : 'transparent'};
  background: ${isVisible ? theme?.colors.palette.white : 'transparent'};
  max-height: ${isVisible ? '200px' : '0'};
  transition: max-height 0.3s ease-in-out;

  ${Year} {
    opacity: ${isVisible ? '1' : '0'};
    transition: ${isVisible ? 'opacity 0.5s linear 0.5s' : 'opacity 0.1s linear 0'};
  }

  ${Score} {
    opacity: ${isVisible ? '1' : '0'};
    transition: ${isVisible ? 'opacity 0.5s linear 0.5s' : 'opacity 0.1s linear 0'};
  }

  ${RatingShift} {
    opacity: ${isVisible ? '1' : '0'};
    transition: ${isVisible ? 'opacity 0.5s linear 0.5s' : 'opacity 0.1s linear 0'};
  }
`,
);

export const AttachmentContent = styled.div`
  padding: 15px 15px 15px 125px;
  height: 100%;
  box-sizing: border-box;
`;
