"use client"

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState<boolean>(false)

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true)
    }, [])

    if (!mounted) {
        return <Button
            variant="ghost"
            size="icon-lg"
        >
            <SunIcon />
        </Button>
    }

    return (
        <Button
            variant="ghost"
            size="icon-lg"
            onClick={() => {
                setTheme(theme === "dark" ? "light" : "dark")
            }}
        >
            {
                theme === "dark"
                    ?
                    <MoonIcon />
                    :
                    <SunIcon />
            }
        </Button>
    );
}

export default ThemeToggle;