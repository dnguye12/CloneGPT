import { createStore } from "zustand"

export type Model = {
    chef: string
    chefSlug: string
    id: string
    name: string
    providers: string[]
    desc: string
}

const models: Model[] = [
    {
        chef: "OpenAI",
        chefSlug: "openai",
        id: "gpt-5.4",
        name: "GPT 5.4",
        providers: ["openai", "azure"],
        desc: "Base model"
    },
    {
        chef: "OpenAI",
        chefSlug: "openai",
        id: "gpt-5.4-pro",
        name: "GPT 5.4 Pro",
        providers: ["openai", "azure"],
        desc: "Pro model"
    },
    {
        chef: "OpenAI",
        chefSlug: "openai",
        id: "gpt-5.3-codex",
        name: "GPT 5.3 Codex",
        providers: ["openai", "azure"],
        desc: "Agentic model"
    },
    {
        chef: "OpenAI",
        chefSlug: "openai",
        id: "gpt-5.4-mini",
        name: "GPT 5 Mini",
        providers: ["openai", "azure"],
        desc: "Fast model"
    },
]

export type ModelSelectionState = {
    currentModel: Model
    allModels: Model[]
}

export type ModelSelectionActions = {
    changeModel: (newModelId: string) => void
}

const defaultInitState: ModelSelectionState = {
    currentModel: models[0],
    allModels: models
}

export type ModelSelectionStore = ModelSelectionState & ModelSelectionActions

export const createModelSelectionStore = (initState: ModelSelectionState = defaultInitState) => {
    return createStore<ModelSelectionStore>()((set) => ({
        ...initState,
        changeModel: (newModelId) => set(({ currentModel: models.find((model) => model.id === newModelId) }))
    }))
}