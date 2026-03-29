import { db } from "@/db";
import { users } from "@/db/schemas/users";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { username } = body

        const existingUser = await db.select().from(users).where(eq(users.username, username))

        if (existingUser.length > 0) {
            return NextResponse.json(existingUser[0])
        } else {
            const [user] = await db.insert(users).values({
                username
            }).returning()

            return NextResponse.json(user)
        }
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}