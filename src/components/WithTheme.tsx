import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e91e63',
      light: '#ed4b82',
      dark: '#a31545',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: "'roboto', sans-serif",
    fontSize: 12,
    body2: {
      fontSize: '13px',
    },
  },
});

export default function WithTheme({ children }: Props) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
