export const defaultLocale = 'en';
export const locales = ['en'];

export function getLocale(pathname: string) {
  return locales.find(locale => pathname.startsWith(`/${locale}`)) || defaultLocale;
}
