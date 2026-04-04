import prisma from '@/lib/prisma';
import bcrypt from "bcryptjs";

export async function POST(request) {

    const { username, password } = await request.json();

    const user = await prisma.user.findFirst({
        where: { username: username }
    })

    if (!user) {
        return (
            Response.json({ msg: "user does not exits..." }, { status: 404 })
        )
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        return (
            Response.json({ msg: "password is wrong" }, { status: 401 })
        )
    }
    return Response.json({ message: "logged in successfully" }, { status: 200 })
}
