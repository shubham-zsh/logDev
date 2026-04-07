import prisma from '@/lib/prisma';
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server'

export async function POST(request) {

    try {
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

        const token = jwt.sign(
            { userId: user.id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        const response = NextResponse.json(
            { message: "logged in successfully" },
            { status: 200 }
        )

        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7
        })

        return response;

    } catch (err) {
        return Response.json({ msg: "Something went wrong..." }, { status: 500 })
    }
}
