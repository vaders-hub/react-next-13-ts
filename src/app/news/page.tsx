import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchNews } from 'store/news';
import Title from 'components/atoms/title';
import List from 'components/organisms/news/list';

export default async function Reddit(props: any) {
  const params = { q: 'apple', from: '2023-08-16', to: '2023-08-16', sortBy: 'popularity', page: 3, pageSize: 10 };
  const initialData = await fetchNews(params);

  return (
    <main>
      <Suspense>
        <Title title={'News Feed'} />
        <List initialData={initialData} />
      </Suspense>
    </main>
  );
}
