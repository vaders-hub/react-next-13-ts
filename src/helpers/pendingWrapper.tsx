'use client';

import React, { use, Suspense, useEffect, useRef, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { getCookie, setCookie } from 'cookies-next';
import { usePathname, useSearchParams } from 'next/navigation';

import { useQueryState } from 'next-usequerystate';

import { useNavActions, useNav } from 'store/index';
import { usePageLoaded, usePageLoadActions } from 'store';

interface ChildProp {
  children: React.ReactNode;
  data: any;
}

export default function PendingWrapper({ children, data }: ChildProp) {
  const navdata = use(data);
  const { setNav } = useNavActions();
  const { setPageLoad } = usePageLoadActions();
  const loadedLnb = useNav();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!loadedLnb.length) setNav(navdata);

  /*
  * leave warning 
  * get set cookie
  useEffect(() => {
    const unloadCallback = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
      return '';
    };
    console.log('getCookie', getCookie('myCookie'));
    setCookie('router-test', 'safe', { maxAge: 3600, path: '/' });

    window.addEventListener('beforeunload', unloadCallback);

    return () => {
      window.removeEventListener('beforeunload', unloadCallback);
    };
  }, []);
*/
  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log('route finished');
    setPageLoad(false);
    return () => {
      console.log('route started');
    };
  }, [pathname, searchParams, setPageLoad]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const targetUrl = (e.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        setPageLoad(true);

        console.log('click route started');
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href]');

      anchorElements.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
    };

    const mutationObserver = new MutationObserver(handleMutation);

    mutationObserver.observe(document, { childList: true, subtree: true });
  }, [setPageLoad]);

  return (
    <Suspense fallback={<p>⌛loading initial data...</p>}>
      <>{children}</>
    </Suspense>
  );
}
