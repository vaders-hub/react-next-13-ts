'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { usePageLoaded, usePageLoadActions } from 'store';
import { useNavActions, createNewCustomStore } from 'store/index';
import { useSession } from 'store/session';
import usePrevious from 'hooks/usePrevious';

import Header from 'components/organisms/header';
interface ChildProp {
  children: React.ReactNode;
  data: any;
}

export default function SessionProvider({ children, data }: ChildProp) {
  const loginStatus = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathname = usePrevious(pathname);
  const pageLoaded = usePageLoaded();
  const { setPageLoad } = usePageLoadActions();
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const nav = useNavActions();

  useEffect(() => {
    nav.setNav(data);
    if (!loginStatus) {
      setVisible(false);
      if (pathname === '/login') setVisible(true);
      if (pathname !== '/login') router.push('/login');
    }

    if (loginStatus) {
      setVisible(true);
      if (pathname === '/login') router.push('/');
    }

    return () => {};
  }, [loginStatus, pathname, router, setVisible, nav]);

  useEffect(() => {
    if (pathname !== previousPathname) {
      setPageLoad(false);
    }
    return () => {
      setPageLoad(true);
    };
  }, [pathname, previousPathname, pageLoaded, setPageLoad]);

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
