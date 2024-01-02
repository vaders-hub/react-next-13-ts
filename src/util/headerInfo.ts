'use server';

import { headers } from 'next/headers';

export default async function headerInfo() {
  const hdata = await headers();

  return hdata;
}
