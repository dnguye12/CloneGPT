"use client"

import { Button } from "@/components/ui/button"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/providers/auth-provider";
import { useTheme } from "next-themes";
import Image from 'next/image'
import { useState } from "react";
import { toast } from "sonner";

const LoginPage = () => {
    const { theme } = useTheme()
    const [username, setUsername] = useState<string>("")
    const login = useAuthStore((state) => state.login)
    const isLoading = useAuthStore((state) => state.isLoading)

    const handleLogin = async () => {
        const res = await fetch(`/api/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username })
        })

        if (res?.ok) {
            toast.success("Login successfully")
            login(username)
        } else {
            toast.error("Login failed, try again")
        }

    }

    return (
        <div className="main-container">
            <div className="flex flex-col gap-6 w-full max-w-sm -mt-32">
                <form>
                    <FieldGroup>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="flex flex-col items-center gap-2 font-medium">
                                <div className="flex size-8 items-center justify-center rounded-md">
                                    <Image
                                        src={(theme === "dark" || theme == undefined) ? "/logo-dark.svg" : "/logo-light.svg"}
                                        alt="HuyGPT"
                                        height={72}
                                        width={72}
                                        className=" size-12"
                                    />
                                </div>
                                <span className="sr-only">Acme Inc.</span>
                            </div>
                            <h1 className="text-xl font-bold">Welcome to Clone GPT</h1>
                            <FieldDescription>
                                Tuong My meo meo :3
                            </FieldDescription>
                        </div>
                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input
                                id="username"
                                type="text"
                                placeholder="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                disabled={isLoading}
                            />
                        </Field>
                        <Field>
                            <Button type="button" size={"lg"} onClick={handleLogin} disabled={isLoading}>Login</Button>
                        </Field>
                    </FieldGroup>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;