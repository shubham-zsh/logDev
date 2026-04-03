import prisma from '@/lib/prisma';

export async function POST(request) {

    const {username, password} = await request.json();

    const user = await prisma.user.findFirst({
    where: { username: username }
    })
    
    if (!user) {
        return (
            Response.json({msg: "user does not exits..."})
        )
    }
    return Response.json({message: "signed in done"})
}
