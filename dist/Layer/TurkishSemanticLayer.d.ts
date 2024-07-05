import { MultiWordLayer } from "./MultiWordLayer";
export declare class TurkishSemanticLayer extends MultiWordLayer<string> {
    /**
     * Constructor for the Turkish semantic layer. Sets semantic information for each word in
     * the node.
     * @param layerValue Layer value for the Turkish semantic information. Consists of semantic (Turkish synset id)
     *                   information for every word.
     */
    constructor(layerValue: string);
    /**
     * Sets the value for the Turkish semantic layer in a node. Value may consist of multiple sense information
     * separated via '$' character. Each sense value is a string representing the synset id of the sense.
     * @param layerValue New layer info
     */
    setLayerValue(layerValue: string): void;
}
