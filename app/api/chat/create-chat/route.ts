import { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { db } from "@/db";
import { chats } from "@/db/schemas/chats";
import { messageFiles } from "@/db/schemas/messageFiles";
import { messages } from "@/db/schemas/messages";
import { users } from "@/db/schemas/users";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {
        username,
        message
    }: {
        username: string,
        message: PromptInputMessage
    } = await req.json()

    try {
        const [user] = await db.select().from(users).where(
            eq(users.username, username)
        )

        const [newChat] = await db.insert(chats).values({
            userId: user.id
        }).returning()

        const [newMessage] = await db.insert(messages).values({
            chatId: newChat.id,
            role: "user",
            text: message.text
        }).returning()

        if(message.files.length > 0) {
            for(const file of message.files) {
                await db.insert(messageFiles).values({
                    messageId: newMessage.id,
                    mediaType: file.mediaType,
                    fileName: file.filename,
                    url: file.url
                })
            }
        }

        return NextResponse.json(newChat)        
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Server Error', { status: 500 })
    }
}