// /middleware.js
import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const session = req.auth;
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  if (isAdminRoute) {
    // @ts-ignore
    if (!session || session.user?.role !== "ADMIN") {
      console.log(session)
      // Redirect to home page if not an admin
      // return NextResponse.redirect(new URL("/auth/signin", nextUrl));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};