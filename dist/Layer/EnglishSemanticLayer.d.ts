import { SingleWordLayer } from "./SingleWordLayer";
export declare class EnglishSemanticLayer extends SingleWordLayer<string> {
    /**
     * Constructor for the semantic layer for English language. Sets the layer value to the synset id defined in English
     * WordNet.
     * @param layerValue Value for the English semantic layer.
     */
    constructor(layerValue: string);
}
