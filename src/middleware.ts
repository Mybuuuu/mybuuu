import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['id', 'en', 'ja', 'zh', 'fr'];
const defaultLocale = 'id';

function getLocale(request: NextRequest): string {
  // 1. Try to get from cookie
  const cookieLocale = request.cookies.get('portfolio_locale')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Try to get from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const browserLanguages = acceptLanguage
      .split(',')
      .map((lang) => lang.split(';')[0].trim().toLowerCase().split('-')[0]);
      
    for (const lang of browserLanguages) {
      if (locales.includes(lang)) {
        return lang;
      }
    }
  }

  // 3. Fallback to default
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static assets, internal Next.js files, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // If path is exactly / root, redirect to detected locale
  if (pathname === '/') {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }

  // If path has a locale segment, verify if it's supported
  const segments = pathname.split('/');
  const pathLocale = segments[1];

  // If the path does not start with a valid locale, redirect it to a valid locale path
  if (!locales.includes(pathLocale)) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}
