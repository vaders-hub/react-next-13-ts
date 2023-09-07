import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const nav = [
    { name: 'Home', path: '/' },
    { name: 'Cafes', path: '/cafes' },
    { name: 'News', path: '/news' },
    { name: 'interception test', path: '/interception' },
  ];
  return NextResponse.json(nav);
}
