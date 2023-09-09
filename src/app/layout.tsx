import { getCookie, getCookies, setCookie, hasCookie } from 'cookies-next';

import { wretchNextInstance } from 'util/wretch';
import { useCommonStore, createNewCustomStore } from 'store/index';
import QueryWrapper from 'helpers/queryWrapper';
import SessionProvider from 'helpers/sessionProvider';
import ThemeWrapper from 'components/templates/wrapper';
import CommonContext from 'helpers/commonContext';

import type { Metadata } from 'next';
interface RootLayoutProps {
  children: React.ReactNode;
  random: React.ReactNode;
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

const fetchLnb = async () => {
  // const data: any = await wretchNextInstance.get('/nav');

  // temp
  const data = [
    { name: 'Home', path: '/' },
    { name: 'Cafes', path: '/cafes' },
    { name: 'News', path: '/news' },
    {
      name: 'lab',
      sub: [
        { name: 'interception', path: '/interception' },
        { name: 'camera', path: '/camera' },
        { name: 'test 2', path: '/test2' },
      ],
    },
  ];
  return data;
};

// TODO : define types
export default async function RootLayout({ children, random }: any) {
  const nav: any = await fetchLnb();

  return (
    <html lang='en' suppressHydrationWarning>
      <ThemeWrapper>
        <body>
          <QueryWrapper>
            <SessionProvider data={nav}>
              <CommonContext>
                {children}
                {random}
              </CommonContext>
            </SessionProvider>
          </QueryWrapper>
        </body>
      </ThemeWrapper>
    </html>
  );
}
