import styled, { createGlobalStyle } from 'styled-components';
import { IGlobalTheme } from './theme';

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: "Roboto","Helvetica","Arial",sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme, dark }: IGlobalTheme<{ dark?: boolean }>) =>
      dark ? 'black' : theme?.colors.bg.catskillWhite};
  }

  @keyframes placeHolderShimmer {
    0% {
      background-position: -800px 0
    }
    100% {
      background-position: 800px 0
    }
  }
`;

export const HighlightOrange = styled.div`
  width: 1000px;
  height: 1000px;
  position: absolute;
  top: -426px;
  right: 8%;
  background: ${({ theme }: IGlobalTheme) =>
    `radial-gradient(circle, ${theme?.colors.bg.watusi} 0%, ${theme?.colors.bg.watusi} 50%, transparent 51%, transparent 100%)`};
`;

export const HighlightPurple = styled.div`
  width: 1000px;
  height: 1000px;
  position: absolute;
  top: 300px;
  left: 8%;
  background: ${({ theme }: IGlobalTheme) =>
    `radial-gradient(circle, ${theme?.colors.bg.melrose} 0%, ${theme?.colors.bg.melrose} 50%, transparent 51%, transparent 100%)`};
`;

export const Loader = styled.div`
  animation-duration: 3s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background-color: #fff;
  margin-bottom: 25px;
  background: linear-gradient(
    45deg,
    #ffffff 10%,
    #eeeeee 15%,
    #ffffff 20%,
    #ffffff 40%,
    #eeeeee 45%,
    #ffffff 50%,
    #ffffff 70%,
    #eeeeee 75%,
    #ffffff 80%
  );
  background-size: 800px 104px;
  height: 60px;
  border-radius: 16px;
  position: relative;
`;
