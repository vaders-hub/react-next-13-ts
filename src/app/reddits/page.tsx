import { Suspense } from 'react';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { fetchReddit } from 'store/reddit';
import Title from 'components/atoms/title';
import List from 'components/organisms/reddit/list';

async function getRedditData() {
  const queryClient = new QueryClient();
  const params = { limit: '5', t: 'month' };
  await queryClient.prefetchQuery(['post', params], () => fetchReddit(params));
  return { props: { dehydratedState: dehydrate(queryClient) } };
}

export default async function Reddit(props: any) {
  const params = { limit: '5', t: 'month' };
  const initialData = await fetchReddit(params);

  return (
    <main>
      <div>Reddit</div>

      <Suspense>
        <List posts={initialData} />
      </Suspense>
    </main>
  );
}
