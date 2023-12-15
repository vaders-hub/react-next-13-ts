'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useQueryState } from 'next-usequerystate';
import { useNavActions, useNav } from 'store/index';

interface ChildProp {
  children: React.ReactNode;
  data: any;
}

type PushStateInput = [data: any, unused: string, url?: string | URL | null | undefined];

export default function PendingWrapper({ children, data }: ChildProp) {
  const router = useRouter();
  const pathname = usePathname();
  const [topic, setTopic] = useQueryState('');
  const searchParams = useSearchParams();
  const searchTopic = searchParams.get('topic');
  const [visible, setVisible] = useState(true);
  const loadedLnb = useNav();
  const { setNav, setPageLoad } = useNavActions();

  if (data && !loadedLnb.length) setNav(data);

  useEffect(() => {
    if (data.length) setVisible(true);
    return () => {};
  }, [data]);

  useEffect(() => {
    if (searchTopic) setPageLoad(false);
    // console.log('compare topics', searchTopic);
  }, [searchTopic, setPageLoad]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        console.log('route started');
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('a[href] button');

      anchorElements.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
    };

    const mutationObserver = new MutationObserver(handleMutation);

    mutationObserver.observe(document, { childList: true, subtree: true });

    window.history.pushState = new Proxy(window.history.pushState, {
      apply: (target, thisArg, argArray: PushStateInput) => {
        console.log('route finished');
        return target.apply(thisArg, argArray);
      },
    });
  });

  return <>{visible ? <>{children}</> : <>loading....</>}</>;
}
