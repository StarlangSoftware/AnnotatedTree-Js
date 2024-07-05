import { MultiWordLayer } from "./MultiWordLayer";
export declare class ShallowParseLayer extends MultiWordLayer<string> {
    /**
     * Constructor for the shallow parse layer. Sets shallow parse information for each word in
     * the node.
     * @param layerValue Layer value for the shallow parse information. Consists of shallow parse information
     *                   for every word.
     */
    constructor(layerValue: string);
    /**
     * Sets the value for the shallow parse layer in a node. Value may consist of multiple shallow parse information
     * separated via space character. Each shallow parse value is a string.
     * @param layerValue New layer info
     */
    setLayerValue(layerValue: string): void;
}
