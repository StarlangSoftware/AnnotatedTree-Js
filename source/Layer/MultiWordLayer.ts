import {WordLayer} from "./WordLayer";

export abstract class MultiWordLayer<T> extends WordLayer{

    protected items: Array<T> = new Array<T>()

    getItemAt(index: number): T{
        if (index < this.items.length){
            return this.items[index];
        } else {
            return undefined;
        }
    }

    size(): number{
        return this.items.length
    }

    abstract setLayerValue(layerValue: string):void
}