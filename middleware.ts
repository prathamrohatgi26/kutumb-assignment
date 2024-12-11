import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  // Protected routes
  const protectedRoutes = ["/quotes", "/create-quote"];
  const authRoutes = ["/login"];

  // Handle root path
  if (path === "/") {
    if (token) {
      return NextResponse.redirect(new URL("/quotes", request.url));
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If token exists and user is on login page, redirect to quotes
  if (token && authRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/quotes", request.url));
  }

  // If no token and user tries to access protected routes, redirect to login
  if (!token && protectedRoutes.includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/quotes", "/create-quote"],
};
