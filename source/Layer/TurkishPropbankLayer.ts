import {SingleWordLayer} from "./SingleWordLayer";
import {Argument} from "nlptoolkit-propbank/dist/Argument";

export class TurkishPropbankLayer extends SingleWordLayer<Argument>{

    private propbank: Argument = null

    /**
     * Constructor for the Turkish propbank layer. Sets single semantic role information for multiple words in
     * the node.
     * @param layerValue Layer value for the propbank information. Consists of semantic role information
     *                   of multiple words.
     */
    constructor(layerValue: string) {
        super();
        this.layerName = "propBank"
        this.setLayerValue(layerValue)
    }

    /**
     * Sets the layer value for Turkish propbank layer. Converts the string form to an Argument.
     * @param layerValue New value for Turkish propbank layer.
     */
    setLayerValue(layerValue: string) {
        this.layerValue = layerValue
        this.propbank = new Argument(layerValue)
    }

    /**
     * Accessor for the propbank field.
     * @return Propbank field.
     */
    getArgument(): Argument{
        return this.propbank
    }

    /**
     * Another accessor for the propbank field.
     * @return String form of the propbank field.
     */
    getLayerValue(): string {
        return this.propbank.getArgumentType() + "$" + this.propbank.getId()
    }
}