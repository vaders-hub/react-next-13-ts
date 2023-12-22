import React, { Suspense } from 'react';
import { cookies } from 'next/headers';
import { getCookie, getCookies, setCookie, hasCookie } from 'cookies-next';

import { wretchNextInstance } from 'util/wretch';
import { fetchLnb } from 'util/common';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import ThemeWrapper from 'components/templates/Wrapper';
import PendingWrapper from 'helpers/pendingWrapper';
import QueryWrapper from 'helpers/queryWrapper';
import CommonContext from 'helpers/CommonContext';

import type { Metadata } from 'next';
interface RootLayoutProps {
  children: React.ReactNode;
  random: React.ReactNode;
}

type ThemeMode = 'light' | 'dark';
interface SsrThemeType {
  mode: ThemeMode;
}

import 'asset/styles/globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({ children, random }: RootLayoutProps) {
  const ssrTheme: SsrThemeType = { mode: 'light' };
  const themeCookie = cookies()?.get('theme')?.value;
  const nav: any = await fetchLnb();

  if (themeCookie) {
    Object.assign(ssrTheme, { mode: themeCookie });
  }

  return (
    <html lang='en' suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <PendingWrapper data={nav}>
            <ThemeWrapper ssrTheme={ssrTheme.mode}>
              <QueryWrapper>
                <CommonContext />
                {children}
                {random}
              </QueryWrapper>
            </ThemeWrapper>
          </PendingWrapper>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
