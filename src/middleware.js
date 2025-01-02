import { jwtDecode } from "jwt-decode";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export { default } from "next-auth/middleware"

export async function middleware(request) {
    if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === "/about") {
        return NextResponse.next();
    }

    const token = await getToken({ req: request, secret: process.env.SECRET });

    //if user is not authenticated redirect them to login page
    if (!token) return NextResponse.redirect(new URL("/login", request.url));

    //get user information from token by decode
    const userInfo = jwtDecode(token.token);

    switch (userInfo.role) {
        case "ROLE_USER":
            if (!request.nextUrl.pathname.startsWith("/events") &&
                !request.nextUrl.pathname.startsWith("/overview") &&
                !request.nextUrl.pathname.startsWith("/event-detail/") &&
                !request.nextUrl.pathname.startsWith("/user-profile") &&
                !request.nextUrl.pathname.startsWith("/members") &&
                !request.nextUrl.pathname.startsWith("/assets") 
                // !request.nextUrl.pathname.startsWith("/organization-profile")
            ) {
                return NextResponse.redirect(new URL("/denies", request.url));
            }
            break;
        case "ROLE_SUB_ADMIN":
            if (!request.nextUrl.pathname.startsWith("/overview") &&
                !request.nextUrl.pathname.startsWith("/members") &&
                !request.nextUrl.pathname.startsWith("/user-request") &&
                !request.nextUrl.pathname.startsWith("/user-profile") &&
                !request.nextUrl.pathname.startsWith("/attendees") &&
                !request.nextUrl.pathname.startsWith("/events") &&
                !request.nextUrl.pathname.startsWith("/assets") &&
                !request.nextUrl.pathname.startsWith("/event-detail/")
            ) {
                return NextResponse.redirect(new URL("/denies", request.url));
            }
            break;
        case "ROLE_ADMIN":
            if (
                !request.nextUrl.pathname.startsWith("/overview") &&
                !request.nextUrl.pathname.startsWith("/members") &&
                !request.nextUrl.pathname.startsWith("/user-request") &&
                !request.nextUrl.pathname.startsWith("/organization-profile") &&
                !request.nextUrl.pathname.startsWith("/user-profile") &&
                !request.nextUrl.pathname.startsWith("/attendees") &&
                !request.nextUrl.pathname.startsWith("/events") &&
                !request.nextUrl.pathname.startsWith("/assets") &&
                !request.nextUrl.pathname.startsWith("/event-detail/")
            ) {
                return NextResponse.redirect(new URL("/signup", request.url));
            }
            break;
        default:
            return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher:
        [
            '/overview',
            '/todo-board/:path*',
            '/members',
            '/user-request',
            '/organization-profile',
            '/user-profile',
            '/attendees',
            '/events',
            '/assets',
            '/event-detail/:path*'
        ]
}