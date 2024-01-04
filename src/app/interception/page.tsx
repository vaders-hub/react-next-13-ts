'use server';

import dynamic from 'next/dynamic';
import TopicCells from 'components/molecules/TopicCells';

const List = dynamic(() => import('components/organisms/intercept/List'), {
  loading: () => <>Loading...</>,
});

export default async function Interception() {
  return (
    <>
      <main>
        <TopicCells />
        <List />
      </main>
    </>
  );
}
