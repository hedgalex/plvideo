import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes } from './content/Routes';
import { GlobalStyle } from './styles';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SnackbarProvider } from 'notistack';

export const App: React.FC = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity,
      },
    },
  });

  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <GlobalStyle dark={false} />
        <QueryClientProvider client={queryClient}>
          <Routes />
        </QueryClientProvider>
      </ThemeProvider>
    </SnackbarProvider>
  );
};
