import { getCookie, getCookies, setCookie, hasCookie } from 'cookies-next';

import { wretchNextInstance } from 'util/wretch';
import { useCommonStore, createNewCustomStore } from 'store/index';
import QueryWrapper from 'helpers/queryWrapper';
import SessionProvider from 'helpers/sessionProvider';
import PendingWrapper from 'helpers/pendingWrapper';
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

const tempLnbdata = [
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
const fetchLnb = async () => {
  const data: any = process.env.NODE_ENV === 'development' ? await wretchNextInstance.get('/nav') : tempLnbdata;

  return data;
};

// TODO : define types
export default async function RootLayout({ children, random }: any) {
  const nav: any = await fetchLnb();

  return (
    <html lang='en' suppressHydrationWarning>
      <ThemeWrapper>
        <body>
          <PendingWrapper data={nav}>
            <QueryWrapper>
              <CommonContext />
              {children}
              {random}
            </QueryWrapper>
          </PendingWrapper>
        </body>
      </ThemeWrapper>
    </html>
  );
}
