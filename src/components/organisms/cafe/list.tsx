'use client';

import { useEffect, useMemo, useState } from 'react';
import { useCafeQuery } from 'store/cafe';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import Card from 'components/molecules/card';

export default function List() {
  const { isLoading, isError, data } = useCafeQuery({ page: 1 });

  const currentPage = useMemo(() => data?.current_page, [data]);
  const cafeDatas = useMemo(() => data?.data, [data]);
  const test = cafeDatas?.map((cafe: any) => <Card cafeDatas={cafe} key={cafe.id} />);
  return (
    <>
      {isLoading && <div>isLoading...</div>}
      <div>{currentPage}</div>
      {cafeDatas && (
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
          <Masonry>
            {cafeDatas?.map((cafe: any) => (
              <Card cafeDatas={cafe} key={cafe.id}></Card>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </>
  );
}
