'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { usePageLoaded, usePageLoadActions } from 'store';
import { useSession } from 'store/session';
import usePrevious from 'hooks/usePrevious';

import Header from 'components/organisms/header';
interface ChildProp {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: ChildProp) {
  const loginStatus = useSession();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const previousPathname = usePrevious(pathname);
  const pageLoaded = usePageLoaded();
  const { setPageLoad } = usePageLoadActions();
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

    return () => {};
  }, [loginStatus, pathname, router, setVisible]);

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
