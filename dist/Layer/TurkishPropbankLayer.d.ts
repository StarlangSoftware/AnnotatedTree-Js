import { SingleWordLayer } from "./SingleWordLayer";
import { Argument } from "nlptoolkit-propbank/dist/Argument";
export declare class TurkishPropbankLayer extends SingleWordLayer<Argument> {
    private propbank;
    /**
     * Constructor for the Turkish propbank layer. Sets single semantic role information for multiple words in
     * the node.
     * @param layerValue Layer value for the propbank information. Consists of semantic role information
     *                   of multiple words.
     */
    constructor(layerValue: string);
    /**
     * Sets the layer value for Turkish propbank layer. Converts the string form to an Argument.
     * @param layerValue New value for Turkish propbank layer.
     */
    setLayerValue(layerValue: string): void;
    /**
     * Accessor for the propbank field.
     * @return Propbank field.
     */
    getArgument(): Argument;
    /**
     * Another accessor for the propbank field.
     * @return String form of the propbank field.
     */
    getLayerValue(): string;
}
