import {MetaMorphemesMovedLayer} from "./MetaMorphemesMovedLayer";
import {MetamorphicParse} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class MetaMorphemeLayer extends MetaMorphemesMovedLayer{

    /**
     * Constructor for the metamorpheme layer. Sets the metamorpheme information for multiple words in the node.
     * @param layerValue Layer value for the metamorpheme information. Consists of metamorpheme information of multiple
     *                   words separated via space character.
     */
    constructor(layerValue: string) {
        super(layerValue);
        this.layerName = "metaMorphemes"
    }

    /**
     * Sets the layer value to the string form of the given parse.
     * @param parse New metamorphic parse.
     */
    setLayerValue(parse: any): void{
        this.layerValue = parse.toString();
        this.items = new Array<MetamorphicParse>();
        if (this.layerValue != null){
            let splitWords = this.layerValue.split("\\s");
            for (let word of splitWords){
                this.items.push(new MetamorphicParse(word));
            }
        }
    }

    /**
     * Constructs metamorpheme information starting from the position index.
     * @param index Position of the morpheme to start.
     * @return Metamorpheme information starting from the position index.
     */
    getLayerInfoFrom(index: number): string{
        let size = 0;
        for (let parse of this.items){
            if (index < size + parse.size()){
                let result = parse.getMetaMorpheme(index - size);
                index++;
                while (index < size + parse.size()){
                    result = result + "+" + parse.getMetaMorpheme(index - size);
                    index++;
                }
                return result;
            }
            size += parse.size();
        }
        return null;
    }

    /**
     * Removes metamorphemes from the given index. Index shows the position of the metamorpheme in the metamorphemes list.
     * @param index Position of the metamorpheme from which the other metamorphemes will be removed.
     * @return New metamorphic parse not containing the removed parts.
     */
    metaMorphemeRemoveFromIndex(index: number): MetamorphicParse{
        if (index >= 0 && index < this.getLayerSize(ViewLayerType.META_MORPHEME)){
            let size = 0;
            for (let parse of this.items){
                if (index < size + parse.size()){
                    parse.removeMetaMorphemeFromIndex(index - size);
                    return parse;
                }
                size += parse.size();
            }
        }
        return null;
    }
}