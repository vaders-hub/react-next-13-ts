import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCookie, setCookie } from 'cookies-next';

// https://medium.com/@zachshallbetter/middleware-in-next-js-a-comprehensive-guide-7dd0a928541a
export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const condition = response.cookies.set('myCookie', '456');
  response.headers.set('X-Custom-Header', 'Hello, Middleware!');

  const headerInfo = response?.headers?.get('X-Custom-Header');

  if (condition) {
    if (request.nextUrl.pathname.startsWith('/interception')) {
      // return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}
