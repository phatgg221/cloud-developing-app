import { NextResponse } from "next/server";
import { parse } from "cookie";

export function middleware(req) {
    console.log("Middleware triggered");

    const cookies = parse(req.headers.get("cookie") || "");
    const userInfo = cookies.userInfo ? JSON.parse(cookies.userInfo) : null;

    console.log("Cookies:", cookies);
    console.log("UserInfo:", userInfo);

    const adminRoutes = ["/admin"];

    const requestedPath = req.nextUrl.pathname;
    console.log("Requested Path:", requestedPath);

    if (adminRoutes.includes(requestedPath) && (!userInfo || !userInfo.isAdmin)) {
        console.log("Redirecting to / because user is not an admin");
        return NextResponse.redirect(new URL("/", req.url));
    }

    console.log("Allowing request to proceed");
    return NextResponse.next();
}
