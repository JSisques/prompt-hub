import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas que requieren autenticación
const protectedPaths = ['/settings', '/favorites', '/prompt/create', '/prompts/edit', '/marketplace/sell'];

// Rutas públicas (no requieren autenticación)
const publicPaths = ['/auth/login', '/auth/register', '/auth/forgot-password'];

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // Comprobar si la ruta actual está protegida
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path));
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Si es una ruta protegida y no hay token, redirigir al login
  if (isProtectedPath && !token) {
    const url = new URL('/auth/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // Si es una ruta pública y hay token, redirigir a la página principal
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecutará el middleware
export const config = {
  matcher: [
    /*
     * Coincide con todas las rutas excepto:
     * 1. /api (rutas API)
     * 2. /_next (archivos Next.js)
     * 3. /fonts (archivos estáticos)
     * 4. /favicon.ico (favicon)
     */
    '/((?!api|_next|fonts|favicon.ico).*)',
  ],
};
