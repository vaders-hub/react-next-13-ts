import QueryWrapper from 'helpers/queryWrapper';
import Wrapper from 'components/templates/wrapper';
import Header from 'components/organisms/header';

import { Inter } from 'next/font/google';

import type { Metadata } from 'next';

import 'asset/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <QueryWrapper>
        <Wrapper>
          <body>
            <Header />
            {children}
          </body>
        </Wrapper>
      </QueryWrapper>
    </html>
  );
}
