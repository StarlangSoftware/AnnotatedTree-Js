import {SingleWordLayer} from "./SingleWordLayer";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export abstract class SingleWordMultiItemLayer<T> extends SingleWordLayer<T>{

    protected items: Array<T> = new Array<T>()

    getItemAt(index: number): T{
        if (index < this.items.length){
            return this.items[index];
        } else {
            return undefined;
        }
    }

    getLayerSize(viewLayer: ViewLayerType): number{
        return this.items.length
    }
}