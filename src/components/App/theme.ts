import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';

const mode: any = import.meta.env.REACT_APP_THEME || 'dark';

const baseTheme = createTheme({
  palette: {
    primary: {
      light: '#5e92f3',
      main: '#1565c0',
      dark: '#003c8f',
      contrastText: '#fff',
    },
    mode,
    background: {
      default: mode === 'dark' ? '#121212' : '#fafafa',
      paper: mode === 'dark' ? '#272727' : '#fff',
    },
  },
});

export const theme = createTheme(
  deepmerge(baseTheme, {
    typography: {
      h1: {
        fontSize: baseTheme.typography.pxToRem(35),
        fontWeight: 500,
      },
      h2: {
        fontSize: baseTheme.typography.pxToRem(28),
        fontWeight: 500,
      },
      h3: {
        fontSize: baseTheme.typography.pxToRem(21),
        fontWeight: 500,
      },
      h4: {
        fontSize: baseTheme.typography.pxToRem(18),
        fontWeight: 500,
      },
      h5: {
        fontSize: baseTheme.typography.pxToRem(14),
        fontWeight: 500,
      },
      h6: {
        fontSize: baseTheme.typography.pxToRem(12),
        fontWeight: 500,
      },
      subtitle1: {
        fontSize: baseTheme.typography.pxToRem(14),
      },
      subtitle2: {
        fontSize: baseTheme.typography.pxToRem(12),
      },
      body1: {
        fontSize: baseTheme.typography.pxToRem(14),
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: 'contained',
        },
      },
      MuiCssBaseline: {
        styleOverrides: {
          html: {
            scrollBehavior: 'smooth',
            scrollPaddingTop: '80px',
            [baseTheme.breakpoints.up('sm')]: {
              scrollPaddingTop: '88px',
            },
          },
        },
      },
      MuiDialog: {
        defaultProps: {
          maxWidth: 'xs',
          fullWidth: true,
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            paddingLeft: 24,
            paddingRight: 24,
            paddingTop: 0,
            paddingBottom: 16,
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            paddingTop: '16px!important',
          },
        },
      },
      MuiDialogTitle: {
        styleOverrides: {
          root: {
            paddingBottom: 0,
          },
        },
      },
      MuiFormControl: {
        defaultProps: {
          margin: 'normal',
          fullWidth: true,
        },
        styleOverrides: {
          marginDense: {
            marginTop: 0,
            marginBottom: '0.5rem',
          },
          marginNormal: {
            marginTop: 0,
            marginBottom: '1rem',
          },
        },
      },
      // @ts-ignore
      MuiLoadingButton: {
        defaultProps: {
          variant: 'contained',
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            boxShadow: `0 -2px ${baseTheme.palette.divider} inset`,
            marginBottom: '1.5rem',
          },
        },
      },
      // @ts-ignore
      MuiTabPanel: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          fullWidth: true,
        },
      },
    },
  })
);
