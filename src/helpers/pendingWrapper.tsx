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

  return <>{visible ? <>{children}</> : <>loading....</>}</>;
}
