'use server';

import Link from 'next/link';

export default async function TopicCells() {
  const res = await fetch('http://localhost:3001/api/cells', {
    method: 'GET',
  });
  const data = await res.json();

  return (
    <>
      {data?.map((topic: string, index: number) => (
        <Link key={`${topic}-${index}`} href={`/loc/${topic}`}>
          <span style={{ marginRight: '0.5rem' }}>{topic}</span>
        </Link>
      ))}
    </>
  );
}
