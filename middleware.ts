import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

const PUBLIC_PATHS = [
  "/",
  "/login",
  "/signup",
  "/blog",
  "/api/auth/set-token",
];

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("JWT verification failed", err);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get("token")?.value;
  const decoded: any = token ? await verifyJWT(token) : null;

  // If user is authenticated and trying to access login or signup, redirect to home
  if (
    decoded &&
    (pathname.toLowerCase() === "/login" ||
      pathname.toLowerCase() === "/register")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow all public paths (e.g., for unauthenticated users)
  if (
    PUBLIC_PATHS.some(
      (path) => pathname === path || pathname.startsWith(path + "/")
    )
  ) {
    return NextResponse.next();
  }

  // No token, redirect to login
  if (!decoded) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Admin route protection
  if (
    pathname.startsWith("/admin") &&
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] !==
      "ADMIN"
  ) {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  const res = NextResponse.next();
  res.headers.set("x-user-role", String(decoded.role));
  res.headers.set("x-user-email", String(decoded.email));
  res.headers.set("x-user-name", String(decoded.firstName));
  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)"],
};