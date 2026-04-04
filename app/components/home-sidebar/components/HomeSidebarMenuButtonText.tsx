"use client"

import { useSidebar } from "@/components/ui/sidebar";

interface HomeSidebarMenuButtonTextProps {
    text: string
}

const HomeSidebarMenuButtonText = ({ text }: HomeSidebarMenuButtonTextProps) => {
    const { open } = useSidebar()

    return (
        <>
            {open && <span>{text}</span>}
        </>
    )

}

export default HomeSidebarMenuButtonText;