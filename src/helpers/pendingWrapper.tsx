'use client';

import React, { use, Suspense, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { flushSync } from 'react-dom';
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

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log('route finished');
    setPageLoad(false);
  }, [pathname, searchParams, setPageLoad]);

  if (navdata) {
    if (!loadedLnb.length) setNav(navdata);
  }

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const targetUrl = (e.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        setPageLoad(true);

        console.log('route started');
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
