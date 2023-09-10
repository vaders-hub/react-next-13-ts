'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useCafeQuery } from 'store/cafe';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import PageLoader from 'components/atoms/pageLoader';
import SearchBox from 'components/molecules/searchBox';

const Card = dynamic(() => import('components/molecules/card'), {
  loading: () => <></>,
});

function List() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const { isLoading, isError, data } = useCafeQuery({ page, search });

  const [lastPage, setLastPage] = useState(0);
  const currentPage = useMemo(() => data?.current_page, [data]);
  const cafeDatas = useMemo(() => data?.data, [data]);
  const setCafePageNo = useCallback((pageNo: number) => {
    setPage(pageNo);
  }, []);
  const setCafeSearchWords = useCallback(
    (words: string) => {
      setSearch(words);
    },
    [setSearch],
  );

  useEffect(() => {
    if (data) {
      if (data.last_page !== lastPage) setLastPage(data.last_page);
    }
  }, [lastPage, data, setLastPage]);

  return (
    <>
      <SearchBox lastPage={lastPage} setCafePageNo={setCafePageNo} setCafeSearchWords={setCafeSearchWords} />
      {isLoading && <PageLoader />}
      <div className={'list-wrap'}>
        {cafeDatas && (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
            <Masonry>{cafeDatas?.map((cafe: any) => <Card cafeDatas={cafe} key={cafe.id} />)}</Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </>
  );
}

export default memo(List);
