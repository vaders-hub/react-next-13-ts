import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const nav = [
    { name: 'Home', path: '/' },
    { name: 'Cafes', path: '/cafes' },
    { name: 'News', path: '/news' },
    {
      name: 'lab',
      sub: [
        { name: 'interception', path: '/interception' },
        { name: 'test 1', path: '/test1' },
        { name: 'test 2', path: '/test2' },
      ],
    },
  ];
  return NextResponse.json(nav);
}
