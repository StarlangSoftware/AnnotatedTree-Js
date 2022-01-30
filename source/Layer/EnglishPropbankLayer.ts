import {SingleWordMultiItemLayer} from "./SingleWordMultiItemLayer";
import {Argument} from "nlptoolkit-propbank/dist/Argument";

export class EnglishPropbankLayer extends SingleWordMultiItemLayer<Argument>{

    constructor(layerValue: string) {
        super();
        this.layerName = "englishPropbank"
        this.setLayerValue(layerValue)
    }

    setLayerValue(layerValue: string) {
        this.items = new Array<Argument>();
        this.layerValue = layerValue;
        if (layerValue != null){
            let splitWords = layerValue.split("#");
            for (let word of splitWords){
                this.items.push(new Argument(word));
            }
        }
    }
}