import { NextResponse } from 'next/server';
import { generatedTopics, fetchBase64 } from 'util/common';

export async function GET(request: Request) {
  const nav = [
    { name: 'Home', path: '/' },
    { name: 'Cafes', path: '/cafes' },
    { name: 'News', path: `/news?topic=${generatedTopics[0]}` },
    {
      name: 'lab',
      sub: [
        { name: 'interception', path: '/interception' },
        { name: 'camera', path: '/camera' },
        { name: 'test 2', path: '/test2' },
      ],
    },
  ];
  return NextResponse.json(nav);
}
