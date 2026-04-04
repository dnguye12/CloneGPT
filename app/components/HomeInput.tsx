"use client"

import { useChat } from "@ai-sdk/react";
import { PromptInput, PromptInputActionAddAttachments, PromptInputActionAddScreenshot, PromptInputActionMenu, PromptInputActionMenuContent, PromptInputActionMenuTrigger, PromptInputBody, PromptInputFooter, PromptInputHeader, PromptInputMessage, PromptInputSubmit, PromptInputTextarea, PromptInputTools } from "@/components/ai-elements/prompt-input";
import HomeInputAttachmentsDisplay from "./HomeInputAttachmentsDisplay";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/providers/auth-provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HomeInput = () => {
    const [text, setText] = useState<string>("")
    const { status, stop } = useChat()
    const username = useAuthStore((state) => state.username)
    const router = useRouter()

    const handleSubmit = async (message: PromptInputMessage) => {
        const hasText = Boolean(message.text)
        const hasAttachments = Boolean(message.files?.length)

        if (!hasText && !hasAttachments) {
            return
        }

        const res = await fetch(`/api/chat/create-chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                message
            })
        })

        if (res?.ok) {
            const data = await res.json()
            router.push(`/chat/${data.id}`)
        } else {
            toast.error("Create chat failed")
        }
    }

    return (
        <div className="flex flex-col h-full">
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