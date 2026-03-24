"use client"

import { useChat } from "@ai-sdk/react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputActionAddAttachments, PromptInputActionAddScreenshot, PromptInputActionMenu, PromptInputActionMenuContent, PromptInputActionMenuTrigger, PromptInputBody, PromptInputFooter, PromptInputHeader, PromptInputMessage, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input";
import HomeInputAttachmentsDisplay from "./HomeInputAttachmentsDisplay";
import { useState } from "react";

const HomeInput = () => {
    const [text, setText] = useState<string>("")
    const { messages, status, sendMessage } = useChat({
        onFinish: (message) => {
            console.log(message)
        }
    })

    const handleSubmit = (message: PromptInputMessage) => {
        const hasText = Boolean(message.text)
        const hasAttachments = Boolean(message.files?.length)

        if (!hasText && !hasAttachments) {
            return
        }

        sendMessage(
            {
                text: message.text || "Sent with attachments",
                files: message.files,
            },
            {
                body: {
                    model: 'gpt-5',
                },
            }
        )

        setText("")
    }

    return (
        <div className="flex flex-col h-full">
            <Conversation>
                <ConversationContent>
                    {messages.map((message) => (
                        <Message key={message.id} from={message.role}>
                            <MessageContent>
                                {message.parts.map((part, i) => {
                                    switch (part.type) {
                                        case "text":
                                            return (
                                                <MessageResponse key={`${message.id}-${i}`}>{part.text}</MessageResponse>
                                            )
                                        default:
                                            return null
                                    }
                                })}
                            </MessageContent>
                        </Message>
                    ))}
                </ConversationContent>
                <ConversationScrollButton />
            </Conversation>

            <PromptInput
                onSubmit={handleSubmit}
                className="mt-4"
                globalDrop
                multiple
            >
                <PromptInputHeader>
                    <HomeInputAttachmentsDisplay />
                </PromptInputHeader>
                <PromptInputBody>
                    <PromptInputTextarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </PromptInputBody>
                <PromptInputFooter>
                    <PromptInputTools>
                        <PromptInputActionMenu>
                            <PromptInputActionMenuTrigger />
                            <PromptInputActionMenuContent>
                                <PromptInputActionAddAttachments />
                                <PromptInputActionAddScreenshot />
                            </PromptInputActionMenuContent>
                        </PromptInputActionMenu>
                        <PromptInputSubmit disabled={!text && !status} status={status} />
                    </PromptInputTools>
                </PromptInputFooter>
            </PromptInput>
        </div>
    );
}

export default HomeInput;