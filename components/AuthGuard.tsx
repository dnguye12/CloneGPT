"use client"

import { useAuthStore } from "@/providers/auth-provider";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface AuthGuardProps {
    children: React.ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
    const username = useAuthStore((state) => state.username)
    const isLoading = useAuthStore((state) => state.isLoading)
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (!isLoading && pathname === "/login" && username && username.length > 0) {
            router.push("/")
        }

        if (isLoading || pathname === "/login") {
            return
        }

        if (!username) {
            router.push("/login")
        }
    }, [isLoading, pathname, router, username])

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    return (
        <>{children}</>
    )
}

export default AuthGuard;