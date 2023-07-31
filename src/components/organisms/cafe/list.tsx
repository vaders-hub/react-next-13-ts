'use client';

import { useEffect } from 'react';
import cafeAxiosInstance from 'util/axios';
import { useCafeQuery } from 'store/cafe';
import Button from 'components/atoms/button';

export default function List() {
  useCafeQuery();

  return (
    <main>
      <div>Cafe list</div>
      <Button name={'Tt'} />
    </main>
  );
}
