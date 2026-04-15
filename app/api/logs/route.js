import prisma from "@/lib/prisma";
import { getAuthFromRequest, unauthorizedJson } from "@/lib/auth";

export async function POST(request) {
    try {
        const auth = await getAuthFromRequest(request);

        if (!auth) {
            return unauthorizedJson();
        }

        const { content } = await request.json();

        const log = await prisma.log.create({
            data: { content, userId: auth.userId },
        });

        console.log(log);

        return Response.json({ msg: "Log created successfully." }, { status: 201 });
    } catch (err) {
        return Response.json({ msg: "Something went wrong..." }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const auth = await getAuthFromRequest(request);

        if (!auth) {
            return unauthorizedJson();
        }

        const logs = await prisma.log.findMany({
            where: { userId: auth.userId },
        });

        return Response.json({ logs }, { status: 200 });
    } catch (err) {
        return Response.json({ msg: "Something went wrong..." }, { status: 500 });
    }
}
