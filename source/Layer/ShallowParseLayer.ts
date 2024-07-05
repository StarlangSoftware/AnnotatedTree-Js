import {MultiWordLayer} from "./MultiWordLayer";

export class ShallowParseLayer extends MultiWordLayer<string>{

    /**
     * Constructor for the shallow parse layer. Sets shallow parse information for each word in
     * the node.
     * @param layerValue Layer value for the shallow parse information. Consists of shallow parse information
     *                   for every word.
     */
    constructor(layerValue: string) {
        super();
        this.layerName = "shallowParse"
        this.setLayerValue(layerValue)
    }

    /**
     * Sets the value for the shallow parse layer in a node. Value may consist of multiple shallow parse information
     * separated via space character. Each shallow parse value is a string.
     * @param layerValue New layer info
     */
    setLayerValue(layerValue: string): void {
        this.items = new Array<string>();
        this.layerValue = layerValue;
        if (layerValue != null){
            let splitParse = layerValue.split(" ");
            for (let item of splitParse){
                this.items.push(item)
            }
        }
    }

}