import prisma from "@/lib/prisma";

export async function POST(request) {
    try {
        const { content } = await request.json();
        const userId = parseInt(request.headers.get("userId"));

        const log = await prisma.log.create({
            data: { content, userId },
        });

        console.log(log);

        return Response.json({ msg: "Log created successfully." }, { status: 201 });
    } catch (err) {
        return Response.json({ msg: "Something went wrong..." }, { status: 500 });
    }
}

export async function GET(request) {
    try {
        const userId = parseInt(request.headers.get("userId"));

        const logs = await prisma.log.findMany({
            where: { userId },
        });

        return Response.json({ logs }, { status: 200 });
    } catch (err) {
        return Response.json({ msg: "Something went wrong..." }, { status: 500 });
    }
}
