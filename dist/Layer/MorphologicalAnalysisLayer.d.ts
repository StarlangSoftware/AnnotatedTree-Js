import { MultiWordMultiItemLayer } from "./MultiWordMultiItemLayer";
import { MorphologicalParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalParse";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare class MorphologicalAnalysisLayer extends MultiWordMultiItemLayer<MorphologicalParse> {
    /**
     * Constructor for the morphological analysis layer. Sets the morphological parse information for multiple words in
     * the node.
     * @param layerValue Layer value for the morphological parse information. Consists of morphological parse information
     *                   of multiple words separated via space character.
     */
    constructor(layerValue: string);
    /**
     * Returns the morphological tag (for PART_OF_SPEECH) or inflectional group (for INFLECTIONAL_GROUP) at position
     * index.
     * @param viewLayer Layer type.
     * @param index Position of the morphological tag (for PART_OF_SPEECH) or inflectional group (for INFLECTIONAL_GROUP)
     * @return The morphological tag (for PART_OF_SPEECH) or inflectional group (for INFLECTIONAL_GROUP)
     */
    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string;
    /**
     * Returns the total number of morphological tags (for PART_OF_SPEECH) or inflectional groups
     * (for INFLECTIONAL_GROUP) in the words in the node.
     * @param viewLayer Layer type.
     * @return Total number of morphological tags (for PART_OF_SPEECH) or inflectional groups (for INFLECTIONAL_GROUP)
     * in the words in the node.
     */
    getLayerSize(viewLayer: ViewLayerType): number;
    /**
     * Sets the layer value to the string form of the given morphological parse.
     * @param layerValue New morphological parse.
     */
    setLayerValue(layerValue: any): void;
    /**
     * Checks if the last inflectional group contains VERB tag.
     * @return True if the last inflectional group contains VERB tag, false otherwise.
     */
    isVerbal(): boolean;
    /**
     * Checks if the last verbal inflectional group contains ZERO tag.
     * @return True if the last verbal inflectional group contains ZERO tag, false otherwise.
     */
    isNominal(): boolean;
}
