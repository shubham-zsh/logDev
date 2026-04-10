import prisma from "@/lib/prisma";
import { jwtVerify } from "jose";
import jwt from 'jsonwebtoken';
import { NextResponse } from "next/server";

export async function POST(req) {

    const { userId, content } = await req.json();

    const user = await prisma.userId.findFirst({
        where: {userId: true}
    })
}
