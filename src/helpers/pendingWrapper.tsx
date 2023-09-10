'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useNavActions, useNav } from 'store/index';

interface ChildProp {
  children: React.ReactNode;
}

export default function PendingWrapper({ children }: ChildProp) {
  const [visible, setVisible] = useState(false);
  const nav = useNavActions();
  const loadedLnb = useNav();

  useEffect(() => {
    if (loadedLnb.length) setVisible(true);
    return () => {};
  }, [loadedLnb]);

  return <>{visible ? <>{children}</> : <>loading....</>}</>;
}
