import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';

interface Props {
  children?: React.ReactNode;
}

const theme = createMuiTheme({
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
