import { ModelSelector, ModelSelectorContent, ModelSelectorEmpty, ModelSelectorGroup, ModelSelectorInput, ModelSelectorList, ModelSelectorLogo, ModelSelectorName, ModelSelectorTrigger } from "@/components/ai-elements/model-selector";
import { Button } from "@/components/ui/button";
import { useModelSelectionStore } from "@/providers/model-selection-store-provider";
import HomeModelSelectorItem from "./HomeModelSelectorItem";

const HomeModelSelector = () => {
    const { currentModel, allModels, changeModel } = useModelSelectionStore((state) => state)

    const modelChefs = [...new Set(allModels.map((model) => model.chef))]

    return (
        <ModelSelector>
            <ModelSelectorTrigger asChild>
                <Button variant={"ghost"}>
                    {currentModel?.chefSlug && (
                        <ModelSelectorLogo provider={currentModel.chefSlug} />
                    )}
                    {currentModel?.name && (
                        <ModelSelectorName>{currentModel.name}</ModelSelectorName>
                    )}
                </Button>
            </ModelSelectorTrigger>
            <ModelSelectorContent>
                <ModelSelectorInput placeholder="Search models..." />
                <ModelSelectorList>
                    <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
                    {modelChefs.map((chef) => (
                        <ModelSelectorGroup heading={chef} key={chef}>
                            {
                                allModels
                                    .filter((model) => model.chef === chef)
                                    .map((model) => (
                                        <HomeModelSelectorItem
                                            key={model.id}
                                            model={model}
                                            currentModel={currentModel}
                                            onSelect={() => changeModel(model.id)}
                                        />
                                    ))
                            }
                        </ModelSelectorGroup>
                    ))}
                </ModelSelectorList>
            </ModelSelectorContent>
        </ModelSelector>
    );
}

export default HomeModelSelector;