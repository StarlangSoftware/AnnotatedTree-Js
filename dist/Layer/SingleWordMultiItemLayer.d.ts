import { SingleWordLayer } from "./SingleWordLayer";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare abstract class SingleWordMultiItemLayer<T> extends SingleWordLayer<T> {
    protected items: Array<T>;
    getItemAt(index: number): T;
    getLayerSize(viewLayer: ViewLayerType): number;
}
