import { WordLayer } from "./WordLayer";
export declare abstract class SingleWordLayer<T> extends WordLayer {
    /**
     * Sets the property of the word
     * @param layerValue Layer info
     */
    setLayerValue(layerValue: string): void;
}
