import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

async function POST(request: Request) {
    
    //1. get data from the request body 
    const { username, name, email, password } = await request.json()

    //2. Check if the user exists 
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if (existingUser) {
        return NextResponse.json(
            { error: "User already exists" }, 
            { status: 400 }
        )
    }

    //3. Hash the password 
    const passwordHash = await bcrypt.hash(password, 10)

    //4. Create user in database 
    const user = await prisma.user.create({
        data: {
            username,
            email, 
            name, 
            passwordHash
        }
    })

    //5. Return success response 
    return NextResponse.json(
        { message: "User created successfully"},
        { status: 201 }
    )
}

export { POST }