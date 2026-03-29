"use client"

import { useChat } from "@ai-sdk/react";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { PromptInput, PromptInputActionAddAttachments, PromptInputActionAddScreenshot, PromptInputActionMenu, PromptInputActionMenuContent, PromptInputActionMenuTrigger, PromptInputBody, PromptInputFooter, PromptInputHeader, PromptInputMessage, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input";
import HomeInputAttachmentsDisplay from "./HomeInputAttachmentsDisplay";
import { useState } from "react";
import { useModelSelectionStore } from "@/providers/model-selection-store-provider";
import { Button } from "@/components/ui/button";

const HomeInput = () => {
    const { currentModel } = useModelSelectionStore((state) => state)
    const [text, setText] = useState<string>("")
    const { messages, status, sendMessage, stop } = useChat()

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
                    model: currentModel.id,
                },
            }
        )

        setText("")
    }

    return (
        <div className="flex flex-col h-full">
            <Conversation>
                <ConversationContent className="px-0">
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
                        className="min-h-12"
                    />
                </PromptInputBody>
                <PromptInputFooter>
                    <PromptInputTools className="w-full justify-between">
                        <PromptInputActionMenu>
                            <PromptInputActionMenuTrigger variant={"outline"} />
                            <PromptInputActionMenuContent className=" min-w-fit flex flex-col">
                                <Button variant={"ghost"} size={"lg"} asChild className=" justify-start">
                                    <PromptInputActionAddAttachments />
                                </Button>
                                <Button variant={"ghost"} size={"lg"} asChild className=" justify-start">
                                    <PromptInputActionAddScreenshot />
                                </Button>
                            </PromptInputActionMenuContent>
                        </PromptInputActionMenu>
                        <PromptInputSubmit
                            status={status}
                            onStop={stop}
                        />
                    </PromptInputTools>
                </PromptInputFooter>
            </PromptInput>
        </div>
    );
}

export default HomeInput;