import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const news = [{ title: 'Home', contents: 'home' }];
  return NextResponse.json(news);
}
