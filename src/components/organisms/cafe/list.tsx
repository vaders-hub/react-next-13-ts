'use client';

import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner } from 'react-virtualized';

import { useCafeQuery } from 'store/cafe';
import { fetchBase64 } from 'util/common';

import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';

import PageLoader from 'components/atoms/pageLoader';
import SearchBox from 'components/molecules/searchBox';
import { AnyNaptrRecord } from 'dns';

const Card = dynamic(() => import('components/molecules/card'), {
  loading: () => <></>,
});

// Default sizes help Masonry decide how many images to batch-measure
const cache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: true,
});

// Our masonry layout will use 3 columns with a 10px gutter between
const cellPositioner = createMasonryCellPositioner({
  cellMeasurerCache: cache,
  columnCount: 3,
  columnWidth: 200,
  spacer: 10,
});

function List(props: any) {
  const [page, setPage] = useState(1);
  // let page = 1;
  const [search, setSearch] = useState('');
  // let search = '';
  // const [lastPage, setLastPage] = useState(0);
  // let lastPage = 0;

  const { isLoading, isError, data } = useCafeQuery({ page, search });
  const currentPage = data?.current_page;
  const cafeDatas = data?.data;
  const lastPage = data?.last_page;
  const [cafedatasWithBlur, setCafedatasWithBlur] = useState([]);

  const getBlurData = useCallback(async () => {
    try {
      const bData: any = await Promise.all(
        cafeDatas?.map(async (data: any) => {
          data.blurImg = await fetchBase64(data.primary_image_url);
          return data;
        }),
      );
      if (bData) {
        if (!cafedatasWithBlur.length) setCafedatasWithBlur(bData);
        console.log('bdata', bData, cafedatasWithBlur);
      }
    } catch (e) {}
  }, [cafeDatas, cafedatasWithBlur]);

  function cellRenderer({ index, key, parent, style }: any) {
    const datum = cafeDatas[index];

    return (
      <CellMeasurer cache={cache} index={index} key={key} parent={parent}>
        <div style={style}>
          <Image
            src={datum.source}
            alt='image'
            style={{
              height: datum.imageHeight,
              width: datum.imageWidth,
            }}
          />
          <h4>{datum.caption}</h4>
        </div>
      </CellMeasurer>
    );
  }

  const setCafePageNo = (pageNo: number) => {
    // console.log('setCafePageNo', pageNo);

    if (currentPage !== pageNo) {
      setTimeout(() => {
        setPage(pageNo);
      }, 0);
    }
  };

  const setCafeSearchWords = (words: string) => {
    if (words !== search) setSearch(words);
  };

  console.log('CAFE LIST');
  return (
    <>
      <SearchBox lastPage={lastPage} setCafePageNo={setCafePageNo} setCafeSearchWords={setCafeSearchWords} />

      <div className={'list-wrap'}>
        {!isLoading ? (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1200: 4 }}>
            <Masonry>{cafeDatas?.map((cafe: any) => <Card cafeDatas={cafe} key={cafe.id} />)}</Masonry>
          </ResponsiveMasonry>
        ) : (
          <PageLoader />
        )}
      </div>
    </>
  );
}

List.displayName = 'List';
export default memo(List);
