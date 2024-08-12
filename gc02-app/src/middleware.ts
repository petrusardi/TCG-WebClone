import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./helpers/jwt";

export async function middleware(request: NextRequest) {
  const auth = request.cookies.get("Authorization");

  if (request.nextUrl.pathname.startsWith("/login")) {
    if (auth) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      return NextResponse.next();
    }
  }

  if (request.nextUrl.pathname.startsWith("/wishlist")) {
    if (auth) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/api/wishlist")) {
    if (!auth) {
      return NextResponse.json(
        {
          message: "Invalid token",
        },
        { status: 401 }
      );
    }

    const [_, token] = auth.value.split(" ");
    if (!token) {
      return NextResponse.json(
        {
          message: "Invalid token",
        },
        { status: 401 }
      );
    }

    const data = await verifyToken(token);
    const userId = data.payload._id;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", userId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/products/:path*",
    "/login",
    "/api/wishlist/:path*",
    "/wishlist/:path*",
  ],
};
