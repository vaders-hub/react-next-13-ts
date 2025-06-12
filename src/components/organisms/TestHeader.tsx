import * as React from 'react';
import About from './About';
import { fetchLnb, reqHeaderInfo } from 'util/common';

export default async function TestHeader() {
  const nav = await fetchLnb();
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`, { cache: 'no-store' });
  const data = await res.json();

  return <About initialData={[data]} />;
}
