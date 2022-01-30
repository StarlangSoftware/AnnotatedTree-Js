import {MultiWordLayer} from "./MultiWordLayer";

export class TurkishSemanticLayer extends MultiWordLayer<string>{

    constructor(layerValue: string) {
        super();
        this.layerName = "semantics"
        this.setLayerValue(layerValue)
    }

    setLayerValue(layerValue: string): void {
        this.items = new Array<string>();
        this.layerValue = layerValue;
        if (layerValue != null){
            let splitMeanings = layerValue.split("\\$");
            for (let meaning of splitMeanings){
                this.items.push(meaning)
            }
        }
    }

}