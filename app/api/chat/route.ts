import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, generateText, streamText, UIMessage } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {
        messages
    }: {
        messages: UIMessage[];
    } = await req.json()

    const result = streamText({
        model: openai('gpt-5'),
        messages: await convertToModelMessages(messages)
    })

    return result.toUIMessageStreamResponse()
}