import bcrypt from 'bcryptjs';
import prisma from '@/lib/prisma';

export async function POST(request) {

    const { username, password } = await request.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    const userExists = await prisma.user.findFirst({
        where: { username: username }
    });

    if (userExists) {
        return Response.json({ msg: "user already exists" }, { status: 409 })
    }

    const user = await prisma.user.create({
        data: {
            username: username,
            password: hashedPassword
        }
    });

    if (!user) {
        return Response.json({ msg: "something went wrong" }, { status: 500 });
    }

    return Response.json({ msg: "register successfull" }, { status: 201 })
}
