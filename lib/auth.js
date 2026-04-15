import { jwtVerify } from 'jose';

function getJwtSecret() {
    return new TextEncoder().encode(process.env.JWT_SECRET);
}

export async function getAuthFromRequest(request) {
    const token = request.cookies.get('token')?.value;

    if (!token) {
        return null;
    }

    try {
        const { payload } = await jwtVerify(token, getJwtSecret());

        if (!payload.userId) {
            return null;
        }

        return {
            userId: Number(payload.userId),
            username: payload.username ?? null,
        };
    } catch {
        return null;
    }
}

export function unauthorizedJson(message = 'Unauthorized') {
    return Response.json({ msg: message }, { status: 401 });
}
