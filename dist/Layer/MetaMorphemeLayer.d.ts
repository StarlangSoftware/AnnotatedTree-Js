import { MetaMorphemesMovedLayer } from "./MetaMorphemesMovedLayer";
import { MetamorphicParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
export declare class MetaMorphemeLayer extends MetaMorphemesMovedLayer {
    /**
     * Constructor for the metamorpheme layer. Sets the metamorpheme information for multiple words in the node.
     * @param layerValue Layer value for the metamorpheme information. Consists of metamorpheme information of multiple
     *                   words separated via space character.
     */
    constructor(layerValue: string);
    /**
     * Sets the layer value to the string form of the given parse.
     * @param parse New metamorphic parse.
     */
    setLayerValue(parse: any): void;
    /**
     * Constructs metamorpheme information starting from the position index.
     * @param index Position of the morpheme to start.
     * @return Metamorpheme information starting from the position index.
     */
    getLayerInfoFrom(index: number): string;
    /**
     * Removes metamorphemes from the given index. Index shows the position of the metamorpheme in the metamorphemes list.
     * @param index Position of the metamorpheme from which the other metamorphemes will be removed.
     * @return New metamorphic parse not containing the removed parts.
     */
    metaMorphemeRemoveFromIndex(index: number): MetamorphicParse;
}
