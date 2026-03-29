import { createStore } from "zustand"

const LOCAL_STORAGE_KEY = "clone-gpt-username"

export type AuthState = {
    username: string | null
    isLoading: boolean
}

export type AuthActions = {
    login: (username: string) => void
    logout: () => void
    hydrate: () => void
}

const defaultInitState: AuthState = {
    username: null,
    isLoading: true
}

export type AuthStore = AuthState & AuthActions

export const createAuthStore = (initState: AuthState = defaultInitState) => {
    return createStore<AuthStore>()((set) => ({
        ...initState,
        login: (newUsername) => {
            localStorage.setItem(LOCAL_STORAGE_KEY, newUsername)
            set(({ username: newUsername, isLoading: false }))
        },
        logout: () => {
            localStorage.removeItem(LOCAL_STORAGE_KEY)
            set({ username: null, isLoading: false })
        },
        hydrate: () => {
            const storedUsername = localStorage.getItem(LOCAL_STORAGE_KEY)
            set({ username: storedUsername, isLoading: false })
        }
    }))
}