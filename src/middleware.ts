import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Skip if the request is for a static file or API route
  if (request.nextUrl.pathname.startsWith('/_next') || request.nextUrl.pathname.startsWith('/api')) {
    return;
  }

  // If the pathname starts with /en, skip redirecting
  if (request.nextUrl.pathname.startsWith('/en')) {
    return;
  }

  // Redirect to /en
  const url = request.nextUrl.clone();
  url.pathname = `/en${request.nextUrl.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api).*)',
  ],
};
