// middleware.ts (at root)
import { NextResponse, type NextRequest } from 'next/server';
import * as jwt from 'jsonwebtoken';

const PUBLIC_PATHS = ['/login', '/register', '/api/auth/set-token'];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  
  // Skip public routes
  if (PUBLIC_PATHS.some(path => pathname.startsWith(path))) return NextResponse.next();

  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.redirect(new URL('/login', req.url));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;

    // Admin-only path protection
    if (pathname.startsWith('/admin') && decoded.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    // Pass decoded data via headers
    const res = NextResponse.next();
    res.headers.set('x-user-role', decoded.role);
    res.headers.set('x-user-email', decoded.email);
    res.headers.set('x-user-name', decoded.firstName);
    return res;
  } catch {
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/', '/profile/:path*'],
};