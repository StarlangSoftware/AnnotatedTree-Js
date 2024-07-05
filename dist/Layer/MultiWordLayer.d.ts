import { WordLayer } from "./WordLayer";
export declare abstract class MultiWordLayer<T> extends WordLayer {
    protected items: Array<T>;
    /**
     * Returns the item (word or its property) at position index.
     * @param index Position of the item (word or its property).
     * @return The item at position index.
     */
    getItemAt(index: number): T;
    /**
     * Returns number of items (words) in the items array list.
     * @return Number of items (words) in the items array list.
     */
    size(): number;
    abstract setLayerValue(layerValue: string): void;
}
