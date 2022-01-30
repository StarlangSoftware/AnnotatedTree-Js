import { MultiWordLayer } from "./MultiWordLayer";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare abstract class MultiWordMultiItemLayer<T> extends MultiWordLayer<T> {
    abstract getLayerSize(viewLayer: ViewLayerType): number;
    abstract getLayerInfoAt(viewLayer: ViewLayerType, index: number): string;
}
