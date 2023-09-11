import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import dayjs from 'dayjs';

import PageLoader from 'components/atoms/pageLoader';
import Title from 'components/atoms/title';
import DateConfig from 'components/molecules/dateConfig';
import Words from 'components/molecules/words';

import { fetchNews } from 'store/news';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

const List = dynamic(() => import('components/organisms/news/list'), {
  loading: () => <PageLoader />,
});

export default async function News({ searchParams }: PageProps) {
  const today = dayjs(new Date()).format('YYYY-MM-DD');
  const yesterday = dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
  const topic = Object.entries(searchParams).length ? searchParams.topic : 'soccer';
  const param = {
    q: topic,
    from: yesterday,
    to: today,
    sortBy: 'popularity',
    page: 1,
    pageSize: 10,
  };
  const initialData: any = [];

  try {
    const result = await fetchNews(param);

    if (result.articles.length) Object.assign(initialData, result.articles);
  } catch (e: any) {
    console.log('e', e.response.status);
  }

  return (
    <>
      <Suspense>
        <Title title={'News Feed'} />
        <div>
          <Words />
          <DateConfig today={today} yesterday={yesterday} />
          {initialData.length > 0 && <List initialData={initialData} />}
        </div>
      </Suspense>
    </>
  );
}
