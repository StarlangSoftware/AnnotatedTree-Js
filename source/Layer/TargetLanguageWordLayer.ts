import {MultiWordLayer} from "./MultiWordLayer";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export abstract class TargetLanguageWordLayer extends MultiWordLayer<string>{

    constructor(layerValue: string) {
        super();
        this.setLayerValue(layerValue)
    }

    setLayerValue(layerValue: string) {
        this.items = new Array<string>();
        this.layerValue = layerValue;
        if (layerValue != null){
            let splitWords = layerValue.split("\\s");
            for (let item of splitWords){
                this.items.push(item)
            }
        }
    }

    getLayerSize(viewLayer: ViewLayerType): number{
        return 0;
    }

    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string{
        return null;
    }
}