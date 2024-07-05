import {MultiWordMultiItemLayer} from "./MultiWordMultiItemLayer";
import {MetamorphicParse} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class MetaMorphemesMovedLayer extends MultiWordMultiItemLayer<MetamorphicParse>{

    /**
     * Constructor for the metaMorphemesMoved layer. Sets the metamorpheme information for multiple words in the node.
     * @param layerValue Layer value for the metaMorphemesMoved information. Consists of metamorpheme information of
     *                   multiple words separated via space character.
     */
    constructor(layerValue: string) {
        super();
        this.layerName = "metaMorphemesMoved"
        this.setLayerValue(layerValue)
    }

    /**
     * Returns the metamorpheme at position index in the metamorpheme list.
     * @param viewLayer Not used.
     * @param index Position in the metamorpheme list.
     * @return The metamorpheme at position index in the metamorpheme list.
     */
    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string {
        let size = 0;
        for (let parse of this.items){
            if (index < size + parse.size()){
                return parse.getMetaMorpheme(index - size);
            }
            size += parse.size();
        }
        return null;
    }

    /**
     * Returns the total number of metamorphemes in the words in the node.
     * @param viewLayer Not used.
     * @return Total number of metamorphemes in the words in the node.
     */
    getLayerSize(viewLayer: ViewLayerType): number {
        let size = 0;
        for (let parse of this.items){
            size += parse.size();
        }
        return size;
    }

    /**
     * Sets the layer value to the string form of the given parse.
     * @param layerValue New metamorphic parse.
     */
    setLayerValue(layerValue: string): void {
        this.items = new Array<MetamorphicParse>();
        this.layerValue = layerValue;
        if (layerValue != null){
            let splitWords = layerValue.split("\\s");
            for (let word of splitWords){
                this.items.push(new MetamorphicParse(word));
            }
        }
    }
    
}