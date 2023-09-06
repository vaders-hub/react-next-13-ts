import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { generate } from 'random-words';
import { generatedTopics } from 'util/common';
import { fetchNews } from 'store/news';
import Title from 'components/atoms/title';
import Words from 'components/molecules/words';

interface PageProps {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const dynamicParams = true;
export const revalidate = 5; // false | 'force-cache' | 0 | number

export async function generateStaticParams() {
  return generatedTopics?.map(topic => ({ slug: topic, all: generatedTopics }));
}

const List = dynamic(() => import('components/organisms/news/list'), {
  loading: () => <p>Loading...</p>,
});

export default async function News({ params }: PageProps) {
  const { slug } = params;
  const param = {
    q: slug,
    from: '2023-08-16',
    to: '2023-08-16',
    sortBy: 'popularity',
    page: 1,
    pageSize: 10,
  };
  const initialData: any = [];

  try {
    const result = await fetchNews(param);

    if (result) Object.assign(initialData, result.articles);
  } catch (e) {}

  return (
    <main>
      <Suspense>
        <Title title={'News Feed'} />
        <div style={{ padding: '0 1rem' }}>
          <Words />
          {initialData.length > 0 && <List initialData={initialData} />}
          {!initialData.length && slug}
        </div>
      </Suspense>
    </main>
  );
}
