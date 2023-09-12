'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { wretchNextInstance } from 'util/wretch';
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
  const [cafedatasWithBlur, setCafedatasWithBlur] = useState([]);

  const fetchBase64 = async (imgUrl: string) => {
    try {
      const g = await wretchNextInstance.options({ headers: { extra: 'extra' } }).get(`/common?imgUrl=${imgUrl}`);
      if (g) return g;
    } catch (e) {}
  };

  const getBlurData = useCallback(async () => {
    const bData: any = await Promise.all(
      cafeDatas?.map(async (data: any) => {
        data.blurImg = await fetchBase64(data.primary_image_url);
        return data;
      }),
    );

    if (!cafedatasWithBlur.length) setCafedatasWithBlur(bData);
  }, [cafeDatas, cafedatasWithBlur]);

  useEffect(() => {
    if (cafeDatas) getBlurData();
  }, [cafeDatas, getBlurData]);

  const setCafePageNo = useCallback((pageNo: number) => {
    setPage(pageNo);
    setCafedatasWithBlur([]);
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
      {!cafedatasWithBlur.length && <PageLoader />}
      <div className={'list-wrap'}>
        {cafedatasWithBlur && (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
            <Masonry>{cafedatasWithBlur?.map((cafe: any) => <Card cafeDatas={cafe} key={cafe.id} />)}</Masonry>
          </ResponsiveMasonry>
        )}
      </div>
    </>
  );
}

export default memo(List);
