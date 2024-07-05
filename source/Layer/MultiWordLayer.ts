import {WordLayer} from "./WordLayer";

export abstract class MultiWordLayer<T> extends WordLayer{

    protected items: Array<T> = new Array<T>()

    /**
     * Returns the item (word or its property) at position index.
     * @param index Position of the item (word or its property).
     * @return The item at position index.
     */
    getItemAt(index: number): T{
        if (index < this.items.length){
            return this.items[index];
        } else {
            return undefined;
        }
    }

    /**
     * Returns number of items (words) in the items array list.
     * @return Number of items (words) in the items array list.
     */
    size(): number{
        return this.items.length
    }

    abstract setLayerValue(layerValue: string):void
}