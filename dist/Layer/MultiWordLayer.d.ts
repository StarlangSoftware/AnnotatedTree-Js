import { WordLayer } from "./WordLayer";
export declare abstract class MultiWordLayer<T> extends WordLayer {
    protected items: Array<T>;
    getItemAt(index: number): T;
    size(): number;
    abstract setLayerValue(layerValue: string): void;
}
