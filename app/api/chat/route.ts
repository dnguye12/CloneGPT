import { openai } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const {
        messages,
        model
    }: {
        messages: UIMessage[];
        model: string;
    } = await req.json()

    const result = streamText({
        model: openai(model ? model : "gpt-5"),
        messages: await convertToModelMessages(messages)
    })

    return result.toUIMessageStreamResponse()
}