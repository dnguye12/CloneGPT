import { ModelSelectorItem, ModelSelectorLogo, ModelSelectorName } from "@/components/ai-elements/model-selector";
import { Model } from "@/stores/model-selection-store";
import { CheckIcon } from "lucide-react";
import { useCallback } from "react";

interface HomeModelSelectorItemProps {
    model: Model
    currentModel: Model
    onSelect: (id: string) => void
}

const HomeModelSelectorItem = ({ model, currentModel, onSelect }: HomeModelSelectorItemProps) => {
    const handleSelect = useCallback(
        () => onSelect(model.id),
        [onSelect, model.id]
    )

    return (
        <ModelSelectorItem key={model.id} value={model.id} onSelect={handleSelect} className=" cursor-pointer">
            <ModelSelectorLogo provider={model.chefSlug} />
            <div className="flex flex-col flex-1">
                <ModelSelectorName>{model.name}</ModelSelectorName>
                <span className=" text-muted-foreground text-sm">{model.desc}</span>
            </div>
            {currentModel.id === model.id
                ?
                (
                    <CheckIcon className="ml-auto size-4" />
                )
                :
                (
                    <div className="ml-auto size-4" />
                )
            }
        </ModelSelectorItem>
    );
}

export default HomeModelSelectorItem;