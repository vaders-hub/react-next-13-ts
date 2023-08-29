import { Suspense } from 'react';
import { fetchNews } from 'store/news';
import Title from 'components/atoms/title';
import Words from 'components/molecules/words';
import List from 'components/organisms/news/list';

export default async function News(props: any) {
  // fix q
  const params = { q: 'test', from: '2023-08-16', to: '2023-08-16', sortBy: 'popularity', page: 1, pageSize: 10 };
  const initialData = await fetchNews(params);

  console.log('props', props.searchParams);
  return (
    <main>
      <Suspense>
        <Title title={'News Feed'} />
        <div style={{ padding: '0 1rem' }}>
          <Words />
          <List initialData={initialData} />
        </div>
      </Suspense>
    </main>
  );
}
