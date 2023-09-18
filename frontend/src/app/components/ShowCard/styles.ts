import styled from 'styled-components';
import { Box, Button } from '@mui/material';
import { GlobalTheme } from '~app/theme';

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
  margin: 0;
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
  height: 150px;
  width: 100%;
`;

export const BackButton = styled(Button)(
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
        border-color: ${theme?.colors.palette.primary_500};
        background: ${theme?.colors.palette.secondary_50};
        
        & > svg {
          color: ${theme?.colors.palette.primary_500};
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
          width: 50px;
          padding: 0 4px;
          color: ${theme?.colors.palette.secondary_500};
        `;
      case 'peers':
        return `
          width: 25px;
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
  width: 16px;
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
