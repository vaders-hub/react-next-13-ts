import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const news = [
    'gave',
    'contrast',
    'vast',
    'means',
    'unusual',
    'well',
    'avoid',
    'grown',
    'apple',
    'parent',
    'hardly',
    'occur',
    'kind',
    'hide',
    'key',
    'special',
    'coast',
    'satellites',
    'lucky',
    'vapor',
  ];
  return NextResponse.json(news);
}
