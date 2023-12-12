import { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { usePageLoadActions } from 'store/index';
import usePrevious from 'hooks/usePrevious';

export default function useCustomRouter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsStr = searchParams.toString();
  const pageLoad = usePageLoadActions();
  const previousWords = usePrevious(searchParamsStr);

  pageLoad.setPageLoad(true);

  useEffect(() => {
    if (previousWords === searchParamsStr) pageLoad.setPageLoad(false);
    return () => {};
  }, [previousWords, searchParamsStr, pageLoad]);

  return router;
}
