'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { getCookie, setCookie } from 'cookies-next';
import usePrevious from 'hooks/usePrevious';

import { useTheme, useThemeActions } from 'store/index';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

import { lightTheme, darkTheme } from 'styles/themes/index';

type ThemeMode = 'light' | 'dark';

interface ChildProp {
  children: React.ReactNode;
  ssrTheme: ThemeMode | undefined;
}

export default function Wrapper({ children, ssrTheme }: ChildProp) {
  const mode = useTheme();
  const { toggleTheme } = useThemeActions();
  const selectedTheme = ssrTheme === 'light' ? lightTheme : darkTheme;
  const [clientTheme, setClientTheme] = useState<any>(selectedTheme);
  const [mounted, setMounted] = useState(false);
  const isMounted = usePrevious(mounted);

  useEffect(() => {
    setMounted(true);
  }, [mounted, setMounted]);

  useEffect(() => {
    if (ssrTheme) toggleTheme(ssrTheme);
  }, [ssrTheme, toggleTheme]);

  useEffect(() => {
    if (isMounted) mode === 'light' ? setClientTheme(lightTheme) : setClientTheme(darkTheme);
  }, [mounted, isMounted, mode, selectedTheme, setClientTheme]);

  return (
    <>
      <ThemeProvider theme={clientTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </>
  );
}
