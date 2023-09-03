import Link from 'next/link';
import { wretchInstance } from 'util/wretch';

export default async function Weather() {
  try {
    const r = await wretchInstance.get('/todos/1');
    console.log('wretchInstance', r);
  } catch (e) {
    console.warn(e);
  }
  return (
    <>
      <main></main>
    </>
  );
}
