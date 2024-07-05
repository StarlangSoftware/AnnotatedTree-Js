import {SingleWordLayer} from "./SingleWordLayer";
import {NamedEntityType} from "nlptoolkit-namedentityrecognition/dist/NamedEntityType";
import {NamedEntityTypeStatic} from "nlptoolkit-namedentityrecognition/dist/NamedEntityTypeStatic";

export class NERLayer extends SingleWordLayer<NamedEntityType>{

    private namedEntity: NamedEntityType = null

    /**
     * Constructor for the named entity layer. Sets single named entity information for multiple words in
     * the node.
     * @param layerValue Layer value for the named entity information. Consists of single named entity information
     *                   of multiple words.
     */
    constructor(layerValue: string) {
        super();
        this.layerName = "namedEntity"
        this.setLayerValue(layerValue)
    }

    /**
     * Sets the layer value for Named Entity layer. Converts the string form to a named entity.
     * @param layerValue New value for Named Entity layer.
     */
    setLayerValue(layerValue: string) {
        this.layerValue = layerValue
        this.namedEntity = NamedEntityTypeStatic.getNamedEntityType(layerValue)
    }

    /**
     * Get the string form of the named entity value. Converts named entity type to string form.
     * @return String form of the named entity value.
     */
    getLayerValue(): string {
        return NamedEntityTypeStatic.getNamedEntity(this.namedEntity)
    }
}