import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host');
  const { device } = userAgent(request);

  console.log('middleware', request.url);
  return NextResponse.next();
}

export const config = {
  // matcher: ['/about/:path*', '/dashboard/:path*'],
};
