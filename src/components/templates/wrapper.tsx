'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { useTheme, useThemeActions } from 'store/index';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { lightTheme, darkTheme } from 'styles/themes/index';

interface ChildProp {
  children: React.ReactNode;
}

export default function Wrapper({ children }: ChildProp) {
  const mode = useTheme();
  const [mounted, setMounted] = useState(false);
  const { toggleTheme } = useThemeActions();
  const selectedTheme = mode === 'light' ? lightTheme : darkTheme;
  const [clientTheme, setClientTheme] = useState<any>(selectedTheme);

  useEffect(() => {}, [mode, setClientTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <p>{typeof window}</p>

      <ThemeProvider theme={clientTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </>
  );
}
