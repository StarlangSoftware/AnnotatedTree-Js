import {WordLayer} from "./WordLayer";

export abstract class SingleWordLayer<T> extends WordLayer{

    /**
     * Sets the property of the word
     * @param layerValue Layer info
     */
    setLayerValue(layerValue: string){
        this.layerValue = layerValue
    }

}