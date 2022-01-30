import {MultiWordLayer} from "./MultiWordLayer";

export class ShallowParseLayer extends MultiWordLayer<string>{

    constructor(layerValue: string) {
        super();
        this.layerName = "shallowParse"
        this.setLayerValue(layerValue)
    }

    setLayerValue(layerValue: string): void {
        this.items = new Array<string>();
        this.layerValue = layerValue;
        if (layerValue != null){
            let splitParse = layerValue.split(" ");
            for (let item of splitParse){
                this.items.push(item)
            }
        }
    }

}