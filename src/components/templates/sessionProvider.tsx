'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authCheck } from 'util/session';
interface ChildProp {
  children: React.ReactNode;
}

export default function SessionProvider({ children }: ChildProp) {
  const pathname = usePathname();
  const router = useRouter();
  const [authInfo, setAuthInfo] = useState(false);

  const getAuthInfo = async () => {
    try {
      const info = await authCheck();

      setAuthInfo(info);
    } catch (e) {}
  };

  useEffect(() => {
    getAuthInfo();
    console.log('pathname', pathname, authInfo);

    return () => {
      console.log('clear');
    };
  }, [authInfo, pathname]);

  return <>{children}</>;
}
