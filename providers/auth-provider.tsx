"use client"

import { AuthStore, createAuthStore } from "@/stores/auth-store";
import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { useStore } from "zustand";

type AuthStoreApi = ReturnType<typeof createAuthStore>

const AuthStoreContext = createContext<AuthStoreApi | undefined>(undefined)
interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [store] = useState(() => createAuthStore())

    useEffect(() => {
        store.getState().hydrate()
    }, [store])

    return (
        <AuthStoreContext.Provider value={store}>
            {children}
        </AuthStoreContext.Provider >
    )
}

export const useAuthStore = <T,>(
    selector: (store: AuthStore) => T
): T => {
    const authStoreContext = useContext(AuthStoreContext)

    if (!authStoreContext) {
        throw new Error('useAuthStore must be used within AuthStoreContext')
    }
    return useStore(authStoreContext, selector)
}