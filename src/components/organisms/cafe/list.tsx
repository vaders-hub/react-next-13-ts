'use client';

import { useEffect } from 'react';
import cafeAxiosInstance from 'util/axios';
import Button from 'components/atoms/button';

export default function List() {
  useEffect(() => {
    cafeAxiosInstance.get('cafes', { params: { page: 1, search: '' } });
  }, []);
  return (
    <main>
      <div>Cafe list</div>
      <Button name={'Tt'} />
    </main>
  );
}
