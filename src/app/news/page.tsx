import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

import dayjs from 'dayjs';
import { generatedTopics, fetchBase64 } from 'util/common';

import Typography from '@mui/material/Typography';

import PageLoader from 'components/atoms/pageLoader';
import Title from 'components/atoms/title';
import DateConfig from 'components/molecules/dateConfig';
import Words from 'components/molecules/words';

import { fetchNews } from 'apis';

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
  const yesterday = startDate ? startDate : dayjs(new Date()).subtract(1, 'day').format('YYYY-MM-DD');
  const today = endDate ? endDate : dayjs(new Date()).format('YYYY-MM-DD');
  const status = {
    fetching: false,
    error: false,
  };
  const initialData: any = [];

  if (topic) {
    const param = {
      q: topic,
      from: yesterday,
      to: today,
      sortBy: 'popularity',
      page: 1,
      pageSize: 10,
    };

    initialData.splice(0);
    status.fetching = true;

    try {
      const result = await fetchNews(param);

      if (result.articles.length) {
        initialData.splice(0);
        const bData: any = await Promise.all(
          result.articles?.map(async (data: any) => {
            data.blurImg = data.urlToImage ? await fetchBase64(data.urlToImage) : '';
            return data;
          }),
        );
        Object.assign(initialData, bData);
        status.fetching = false;
        status.error = false;
      }
    } catch (e: any) {
      status.error = true;
      console.log('error :: ', e.response.status);
    }
  }

  return (
    <>
      {/* <Title title={'News Feed'} /> */}
      <div>
        <Typography variant='h5' gutterBottom data-testid='title'>
          Random topics
        </Typography>
        <Words generatedTopics={generatedTopics} />
        <DateConfig today={today} yesterday={yesterday} />
        {!status.error ? (
          !initialData.length || status.fetching ? (
            <PageLoader />
          ) : (
            <List initialData={initialData} />
          )
        ) : (
          <p>Error Occurred</p>
        )}
      </div>
    </>
  );
}
