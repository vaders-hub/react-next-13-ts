import Link from 'next/link';
import { generatedTopics } from 'util/common';

export default function Interception() {
  return (
    <>
      <main>
        {generatedTopics?.map((topic, index) => (
          <Link key={`${topic}-${index}`} href={`/loc/${topic}`}>
            <span style={{ marginRight: '0.5rem' }}>{topic}</span>
          </Link>
        ))}
      </main>
    </>
  );
}
