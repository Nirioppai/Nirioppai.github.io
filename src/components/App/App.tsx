import { createRef } from 'react';

import { CssBaseline, IconButton, ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Close as CloseIcon } from 'mdi-material-ui';
import { SnackbarProvider } from 'notistack';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import { theme } from './theme';

import { APP_NAME } from '~/constants';
import { AuthContextProvider, AuthContextProvider2 } from '~/contexts';
import { AppRoutes } from '~/routes';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 20 * 1000, // 20 seconds
    },
  },
});

const notistackRef = createRef<any>();

const onClickDismiss = (key: any) => () => {
  notistackRef?.current?.closeSnackbar(key);
};

// TODO: Add AppRoutes
const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider2>
        <AuthContextProvider>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <HelmetProvider>
              <Helmet
                titleTemplate={`%s - ${APP_NAME}`}
                defaultTitle={APP_NAME}
              />
              <SnackbarProvider
                ref={notistackRef}
                action={(key) => (
                  <IconButton
                    onClick={onClickDismiss(key)}
                    sx={{ color: 'white' }}
                  >
                    <CloseIcon />
                  </IconButton>
                )}
              >
                <QueryClientProvider client={queryClient}>
                  <BrowserRouter>
                    <AppRoutes />
                  </BrowserRouter>
                  <ReactQueryDevtools />
                </QueryClientProvider>
              </SnackbarProvider>
            </HelmetProvider>
          </LocalizationProvider>
        </AuthContextProvider>
      </AuthContextProvider2>
    </ThemeProvider>
  );
};

export default App;
