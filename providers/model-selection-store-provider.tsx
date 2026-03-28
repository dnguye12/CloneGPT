"use client"

import { createModelSelectionStore, ModelSelectionStore } from "@/stores/model-selection-store"
import { createContext, ReactNode, useContext, useState } from "react"
import { useStore } from "zustand"

type ModelSelectionStoreApi = ReturnType<typeof createModelSelectionStore>

const ModelSelectionStoreContext = createContext<ModelSelectionStoreApi | undefined>(undefined)

interface ModelSelectionProviderProps {
    children: ReactNode
}

export const ModelSelectionStoreProvider = ({ children }: ModelSelectionProviderProps) => {
    const [store] = useState(() => createModelSelectionStore())

    return (
        <ModelSelectionStoreContext.Provider value={store}>
            {children}
        </ModelSelectionStoreContext.Provider>
    )
}

export const useModelSelectionStore = <T,>(
    selector: (store: ModelSelectionStore) => T,
): T => {
    const modelSelectionStoreContext = useContext(ModelSelectionStoreContext)
    if (!modelSelectionStoreContext) {
        throw new Error('useModelSelectionStore must be used within ModelSelectionStoreProvider')
    }

    return useStore(modelSelectionStoreContext, selector)
}