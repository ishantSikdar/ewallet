import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Extract cookies from the request headers
    const cookies = request.cookies;

    // Determine the cookie name based on the environment
    const cookieName = process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token';

    // Check if the authentication cookie exists
    const isAuthenticated = cookies.get(cookieName) !== undefined;

    if (!isAuthenticated) {
        const signinUrl = new URL('/signin', request.nextUrl.origin);
        signinUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(signinUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|images|signin).*)',
    ]
}
