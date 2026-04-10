import { jwtVerify } from 'jose';
import { NextResponse } from 'next/server';

export async function middleware(request) {
    const url = new URL('/login', request.url);
    const tokenCookie = request.cookies.get('token');

    if (!tokenCookie) {
        return NextResponse.redirect(url);
    }

    const token = tokenCookie.value;
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    try {
        const { payload } = await jwtVerify(token, secret)
        const res = NextResponse.next();

        res.headers.set('userId',payload.userId)

        return res;
    }
    catch (err) {
        return NextResponse.redirect(url);
    }
}

export const config = {
    matcher: ['/dashboard'],
};
