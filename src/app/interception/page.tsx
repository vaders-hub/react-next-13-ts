'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { generatedTopics } from 'util/common';

const listStr = 'List';
const List = dynamic(() => import(`components/organisms/intercept/${listStr}`), {
  loading: () => <>Loading...</>,
});

export default function Interception() {
  return (
    <>
      <main>
        {generatedTopics?.map((topic, index) => (
          <Link key={`${topic}-${index}`} href={`/loc/${topic}`}>
            <span style={{ marginRight: '0.5rem' }}>{topic}</span>
          </Link>
        ))}
        <List />
      </main>
    </>
  );
}
