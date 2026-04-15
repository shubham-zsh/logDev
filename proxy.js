import { NextResponse } from 'next/server';
import { getAuthFromRequest, unauthorizedJson } from '@/lib/auth';

export async function proxy(request) {
    const url = new URL('/login', request.url);
    const pathname = request.nextUrl.pathname;
    const isApiRequest = pathname.startsWith('/api/');
    const auth = await getAuthFromRequest(request);

    if (!auth) {
        if (isApiRequest) {
            return unauthorizedJson();
        }

        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard', '/api/logs']
};
