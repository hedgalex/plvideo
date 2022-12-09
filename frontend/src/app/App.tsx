import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes } from './content/Routes';
import { GlobalStyle, HighlightOrange, HighlightPurple } from './styles';
import { theme } from './theme';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle dark={false} />
      <HighlightOrange />
      <HighlightPurple />
      <Routes />
    </ThemeProvider>
  );
};
