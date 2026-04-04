"use client"

import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton } from "@/components/ui/sidebar";
import { Chat } from "@/db/schemas/chats";
import { useAuthStore } from "@/providers/auth-provider";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const SKELETON_COUNT = 5

const HomeSidebarChatsListSkeleton = () => {
    return (
        <SidebarGroupContent>
            {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <SidebarMenuSkeleton key={`SidebarMenuSkeleton-${i}`} />
            ))}
        </SidebarGroupContent>
    )
}

const HomeSidebarChatsList = () => {
    const { username, isLoading: authLoading } = useAuthStore((state) => state)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [chats, setChats] = useState<Chat[]>([])
    const params = useParams()

    console.log(params)

    useEffect(() => {
        if (authLoading || !username) {
            return
        }

        const fetchChats = async () => {
            try {
                setIsLoading(true)
                const res = await fetch(`/api/chat/${username}`)
                if (!res.ok) {
                    toast.error("Failed to get chat history")
                    throw new Error("Failed to get chat history")
                }
                const data = await res.json()
                setChats(data)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }

        fetchChats()
    }, [authLoading, username])

    if (isLoading) {
        return <HomeSidebarChatsListSkeleton />
    }

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Your chats</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {
                        chats.length > 0
                            ?
                            (
                                chats.map((chat) => (
                                <SidebarMenuItem key={chat.id}>
                                    <SidebarMenuButton asChild isActive={chat.id === params.chatId}>
                                        <Link href={`/chat/${chat.id}`}>{chat.title}</Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))
                            )
                            :
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild disabled={true} className=" pointer-events-none">
                                    <p className=" text-xs text-muted-foreground">No chat history found</p>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                    }
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}

export default HomeSidebarChatsList;