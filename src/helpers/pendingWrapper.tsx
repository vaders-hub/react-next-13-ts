'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { flushSync } from 'react-dom';
import { useQueryState } from 'next-usequerystate';

import { useNavActions, useNav } from 'store/index';
import { usePageLoaded, usePageLoadActions } from 'store';

interface ChildProp {
  children: React.ReactNode;
  data: any;
}

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

export default function PendingWrapper({ children, data }: ChildProp) {
  const loadedLnb = useNav();
  const { setNav } = useNavActions();
  const { setPageLoad } = usePageLoadActions();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const url = `${pathname}?${searchParams}`;
    console.log('route finished');
    setPageLoad(false);
  }, [pathname, searchParams, setPageLoad]);

  const penderStatus = {
    visible: false,
  };

  if (data) {
    if (!loadedLnb.length) setNav(data);
    penderStatus.visible = true;
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

  return <>{penderStatus.visible ? <>{children}</> : <>loading....</>}</>;
}
