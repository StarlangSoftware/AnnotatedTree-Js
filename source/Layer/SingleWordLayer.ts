import {WordLayer} from "./WordLayer";

export abstract class SingleWordLayer<T> extends WordLayer{

    setLayerValue(layerValue: string){
        this.layerValue = layerValue
    }

}