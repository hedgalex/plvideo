import styled, { createGlobalStyle } from 'styled-components';
import { GlobalTheme } from './theme';

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

export const HighlightOrange = styled.div(
  ({ theme }: GlobalTheme) => `
  width: 1000px;
  height: 1000px;
  position: absolute;
  top: -426px;
  right: -100px;
  background: radial-gradient(circle, ${theme?.colors.palette.watusi} 0%, ${theme?.colors.palette.watusi} 50%, transparent 51%, transparent 100%)

  @media only screen and (max-width: 768px) {
    display: none;
  }
`,
);

export const HighlightPurple = styled.div(
  ({ theme }: GlobalTheme) => `
  width: 1000px;
  height: 1000px;
  position: absolute;
  top: 300px;
  left: -400px;
  background: radial-gradient(circle, ${theme?.colors.palette.melrose} 0%, ${theme?.colors.palette.melrose} 50%, transparent 51%, transparent 100%);

  @media only screen and (max-width: 768px) {
    display: none;
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
