import { db } from "@/db";
import { chats } from "@/db/schemas/chats";
import { users } from "@/db/schemas/users";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params

    if (!username || username.trim() === "") {
        return new NextResponse("Missing username", { status: 400 })
    }

    try {
        const [user] = await db.select().from(users).where(eq(users.username, username))

        if (!user) {
            return new NextResponse("User not found", { status: 404 });
        }
        const chatsList = await db
            .select()
            .from(chats)
            .where(eq(chats.userId, user.id))
            .orderBy(desc(chats.updatedAt))

        return NextResponse.json(chatsList)

    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}