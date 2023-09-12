import { NextResponse } from 'next/server';
import { getPlaiceholder } from 'plaiceholder';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const imgUrl = url.searchParams.get('imgUrl') as string;
  const imgResponse = await fetch(imgUrl);
  const blob = await imgResponse.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const { base64 }: any = await getPlaiceholder(buffer);

  return NextResponse.json(base64);
}
