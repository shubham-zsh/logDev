import prisma from "@/lib/prisma";

export async function POST(req) {

    const { content } = await req.json();
    const userId = req.header.get('userId');

    try {
        const log = await prisma.log.create({
            data: { content, userId }
        })
        console.log(log);

        return Response.json({ msg: "log created successfully.." }, { status: 201 })

    } catch (err) {
        return Response.json({ msg: "Something went wrong..." }, { status: 500 })
    }
}
