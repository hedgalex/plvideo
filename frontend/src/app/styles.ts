import styled, { createGlobalStyle } from 'styled-components';
import { GlobalTheme } from './theme';
import { Box } from '@mui/material';

export interface ActiveProps {
  isActive?: boolean;
}

export interface SelectedProps {
  isSelected?: boolean;
}

export interface VisibilityProps {
  isVisible?: boolean;
}

export interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger' | 'success' | 'warning';
}

export const GlobalStyle = createGlobalStyle<GlobalTheme<{ dark?: boolean }>>(
  ({ theme }) => `
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: linear-gradient(0deg, ${theme?.colors.body.secondary} 0%, ${theme?.colors.body.primary} 100%);
    overflow-x: hidden;
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -800px 0
    }
    100% {
      background-position: 800px 0
    }
  }

  @keyframes rotateSpinner {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes delayedDisplay {
    0% {
      display: none;
    }
    100% {
      display: block;
    }
  }
`,
);

export const ProgressLoader = styled.div<{ loading: boolean }>(({ loading = false, theme }) => {
  if (loading) {
    const color1 = theme?.colors.palette.secondary_50;
    const color2 = theme?.colors.palette.secondary_100;

    return `
        background: linear-gradient(
          30deg,
          ${color1} 10%,
          ${color2} 15%,
          ${color1} 20%,
          ${color1} 40%,
          ${color2} 45%,
          ${color1} 50%,
          ${color1} 70%,
          ${color2} 75%,
          ${color1} 80%
        );
        color: transparent;
        animation-duration: 4s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
        animation-name: placeHolderShimmer;
        animation-timing-function: linear;
        background-color: white;
        background-size: 800px 300px;
        min-height: 30px;
      `;
  }
});

export const Flex = styled(Box)`
  display: flex;
`;

export const Button = styled.div<ButtonProps>(
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
            color: ${theme?.colors.palette.primary_300};
            border-color: ${theme?.colors.palette.primary_300};
          }
        `;
    }
  })()}
`,
);
