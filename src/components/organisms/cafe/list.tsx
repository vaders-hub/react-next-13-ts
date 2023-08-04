'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useCafeQuery } from 'store/cafe';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import SearchBox from 'components/molecules/searchBox';
import Card from 'components/molecules/card';

export default function List() {
  const [page, setPage] = useState(1);
  const { isLoading, isError, data } = useCafeQuery({ page });

  const [lastPage, setLastPage] = useState(0);
  const currentPage = useMemo(() => data?.current_page, [data]);
  const cafeDatas = useMemo(() => data?.data, [data]);
  const setCafePageNo = useCallback((pageNo: number) => {
    setPage(pageNo);
  }, []);

  useEffect(() => {
    if (data) {
      if (data.last_page !== lastPage) setLastPage(data.last_page);
    }
  }, [lastPage, data]);

  return (
    <>
      <SearchBox lastPage={lastPage} setCafePageNo={setCafePageNo} />
      {isLoading && <div>isLoading...</div>}
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
