import { ThemeProvider, createTheme, Theme } from '@mui/material/styles'

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export const hotdogStandTheme = createTheme({
  palette: {
    primary: {
      main: '#ff0000',
      light: '#ff0000',
      dark: '#ff0000',
    },
    secondary: {
      main: '#ffd600',
      light: '#ffd600',
      dark: '#ffd600',
    },
    background: {
      default: '#d50000',
      paper: '#ffd600',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
      disabled: '#9a9a9a',
    },
    error: {
      main: '#ef5350',
    },
    warning: {
      main: '#fdd835',
    },
    info: {
      main: '#388e3c',
    },
    success: {
      main: '#e0e0e0',
    },
    divider: 'rgba(0,0,0,0.12)',
  },
});
