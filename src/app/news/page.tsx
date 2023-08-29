import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { generate } from 'random-words';
import { fetchNews } from 'store/news';
import Title from 'components/atoms/title';
import Words from 'components/molecules/words';
import List from 'components/organisms/news/list';

export default async function News() {
  const topics = generate(20);
  const params = { q: topics[0], from: '2023-08-16', to: '2023-08-16', sortBy: 'popularity', page: 1, pageSize: 10 };
  const initialData = await fetchNews(params);

  return (
    <main>
      <Suspense>
        <Title title={'News Feed'} />
        <div style={{ padding: '0 1rem' }}>
          <Words topics={topics} />
          <List initialData={initialData} />
        </div>
      </Suspense>
    </main>
  );
}
