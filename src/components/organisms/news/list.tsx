'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNewsQuery } from 'store/news';
import Image from 'next/image';
import CardMedia from '@mui/material/CardMedia';

export default function List({ initialData }: any) {
  // const { isLoading, isError, data } = useNewsQuery({
  //   q: 'apple',
  //   from: '2023-08-16',
  //   to: '2023-08-16',
  //   sortBy: 'popularity',
  //   page: 2,
  //   pageSize: 10,
  // });
  // console.log('data', data);
  // console.log('initialData', initialData);
  const subDatas = useMemo(() => [...initialData?.articles], [initialData]);
  // console.log('data', subDatas);
  return (
    <>
      <ul>
        {subDatas?.map((item: any, index: any) => (
          <li key={index}>
            <p>{item?.title}</p>
            <CardMedia component='img' image={item?.urlToImage} alt='Paella dish' />
          </li>
        ))}
      </ul>
    </>
  );
}
