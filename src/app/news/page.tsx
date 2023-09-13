import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import dayjs from 'dayjs';
import { generatedTopics, fetchBase64 } from 'util/common';

import Typography from '@mui/material/Typography';

import PageLoader from 'components/atoms/pageLoader';
import Title from 'components/atoms/title';
import DateConfig from 'components/molecules/dateConfig';
import Words from 'components/molecules/words';

import { fetchNews } from 'store/news';

interface SearchParamTypes {
  [key: number | string]: unknown;
  topic: string;
  startDate: string;
  endDate: string;
}
interface PageProps {
  params: { slug: string };
  searchParams: SearchParamTypes;
}

const List = dynamic(() => import('components/organisms/news/list'), {
  loading: () => <PageLoader />,
});

export default async function News({ params, searchParams }: PageProps) {
  const { topic, startDate, endDate } = searchParams;
  const searchTopic = topic ? topic : generatedTopics[0];
  const yesterday = startDate ? startDate : dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
  const today = endDate ? endDate : dayjs(new Date()).format('YYYY-MM-DD');

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
    if (result.articles.length) {
      const bData: any = await Promise.all(
        result.articles?.map(async (data: any) => {
          data.blurImg = data.urlToImage ? await fetchBase64(data.urlToImage) : '';
          return data;
        }),
      );
      Object.assign(initialData, bData);
    }
  } catch (e: any) {
    console.log('error :: ', e.response.status);
  }

  return (
    <>
      <Suspense>
        <Title title={'News Feed'} />
        <div>
          <Typography variant='h5' gutterBottom data-testid='title'>
            Random topics
          </Typography>
          <Words generatedTopics={generatedTopics} />
          <DateConfig today={today} yesterday={yesterday} />
          {initialData.length > 0 && <List initialData={initialData} />}
          {!initialData.length && <div>no result for {searchTopic}</div>}
        </div>
      </Suspense>
    </>
  );
}
