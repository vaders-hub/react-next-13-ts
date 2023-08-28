'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSession } from 'store/session';

import Header from 'components/organisms/header';
interface ChildProp {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: ChildProp) {
  const loginStatus = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!loginStatus) {
      setVisible(false);
      if (pathname === '/login') setVisible(true);
      if (pathname !== '/login') router.push('/login');
    }

    if (loginStatus) {
      setVisible(true);
      if (pathname === '/login') router.push('/');
    }

    return () => {
      console.log('clear');
    };
  }, [loginStatus, pathname, router, setVisible]);

  return (
    <>
      {visible && (
        <>
          {pathname !== '/login' && <Header />}
          {children}
        </>
      )}
    </>
  );
}
