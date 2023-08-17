'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRedditQuery } from 'store/reddit';
import Image from 'next/image';

export default function List(props: any) {
  const { isLoading, isError, data } = useRedditQuery({ limit: '5', t: 'month' }, props);
  const subDatas = useMemo(() => data?.children, [data]);

  return (
    <>
      <ul>
        {subDatas?.map((item: any, index: any) => (
          <li key={index}>
            <p>{item?.data?.title}</p>
            <Image
              src={item?.data?.thumbnail}
              alt='cafe image'
              width={0}
              height={0}
              sizes='100vw'
              style={{ width: '100%', height: 'auto' }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
