'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useNavActions, useNav } from 'store/index';

interface ChildProp {
  children: React.ReactNode;
  data: any;
}

export default function PendingWrapper({ children, data }: ChildProp) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const allSP = searchParams.toString();
  const [visible, setVisible] = useState(true);
  const loadedLnb = useNav();
  const nav = useNavActions();

  if (data && !loadedLnb.length) nav.setNav(data);

  useEffect(() => {
    if (data.length) setVisible(true);
    return () => {};
  }, [data]);

  return <>{visible ? <>{children}</> : <>loading....</>}</>;
}
