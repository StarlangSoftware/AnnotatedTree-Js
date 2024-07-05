import {SingleWordMultiItemLayer} from "./SingleWordMultiItemLayer";
import {Argument} from "nlptoolkit-propbank/dist/Argument";

export class EnglishPropbankLayer extends SingleWordMultiItemLayer<Argument>{

    /**
     * Constructor for the propbank layer for English language.
     * @param layerValue Value for the English propbank layer.
     */
    constructor(layerValue: string) {
        super();
        this.layerName = "englishPropbank"
        this.setLayerValue(layerValue)
    }

    /**
     * Sets the value for the propbank layer in a node. Value may consist of multiple propbank information separated via
     * '#' character. Each propbank value consists of argumentType and id info separated via '$' character.
     * @param layerValue New layer info
     */
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