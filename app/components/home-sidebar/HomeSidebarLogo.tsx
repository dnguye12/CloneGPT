"use client"

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from 'next/image'
import Link from "next/link";

const HomeSidebarLogo = () => {
    const { theme } = useTheme()

    return (
        <div className="flex items-center">
            <Button
                size={"icon-lg"}
                variant={"ghost"}
                className=" size-9"
                asChild
            >
                <Link href={"/"}>
                <Image
                    src={(theme === "dark" || theme == undefined) ? "/logo-dark.svg" : "/logo-light.svg"}
                    alt="HuyGPT"
                    height={24}
                    width={24}
                />
                </Link>
            </Button>

        </div>
    );
}

export default HomeSidebarLogo;