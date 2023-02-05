import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ThemeProvider, createTheme, Theme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

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
      light: '#ff5935',
      main: '#f90000',
      dark: '#bd0000',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffff99',
      main: '#f5d768',
      dark: '#c0a638',
      contrastText: '#000',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
let currentTheme = hotdogStandTheme
const setTheme = (newTheme: Theme) => {
  console.error(`changing theme to ${newTheme}`)
  currentTheme = newTheme
}

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
