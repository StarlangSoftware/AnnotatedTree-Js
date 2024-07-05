import { SingleWordLayer } from "./SingleWordLayer";
import { NamedEntityType } from "nlptoolkit-namedentityrecognition/dist/NamedEntityType";
export declare class NERLayer extends SingleWordLayer<NamedEntityType> {
    private namedEntity;
    /**
     * Constructor for the named entity layer. Sets single named entity information for multiple words in
     * the node.
     * @param layerValue Layer value for the named entity information. Consists of single named entity information
     *                   of multiple words.
     */
    constructor(layerValue: string);
    /**
     * Sets the layer value for Named Entity layer. Converts the string form to a named entity.
     * @param layerValue New value for Named Entity layer.
     */
    setLayerValue(layerValue: string): void;
    /**
     * Get the string form of the named entity value. Converts named entity type to string form.
     * @return String form of the named entity value.
     */
    getLayerValue(): string;
}
