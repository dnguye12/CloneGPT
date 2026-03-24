"use client"

import { useTheme } from "next-themes";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()
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