'use client';

import React, { useMemo } from 'react';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { useTheme } from 'store/index';
import { lightTheme, darkTheme } from 'styles/themes/index';

interface ChildProp {
  children: React.ReactNode;
}

export default function Wrapper({ children }: ChildProp) {
  const mode = useTheme();
  const selectedTheme = useMemo(() => (mode === 'light' ? lightTheme : darkTheme), [mode]);

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline enableColorScheme />
      {children}
    </ThemeProvider>
  );
}
