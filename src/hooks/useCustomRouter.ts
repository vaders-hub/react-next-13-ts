import React, { useEffect, useRef, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { usePageLoaded, usePageLoadActions } from 'store';
import usePrevious from 'hooks/usePrevious';

export default function useCustomRouter() {
  const router = useRouter();
  const fakeRouter: any = {};
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const previous = usePrevious(pathName + searchParams);
  const { setPageLoad } = usePageLoadActions();

  fakeRouter.push = (href: string) => {
    console.log('route started');
    setPageLoad(true);
    router.push(href);
  };

  return fakeRouter;
}
