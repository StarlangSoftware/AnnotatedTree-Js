import { SingleWordMultiItemLayer } from "./SingleWordMultiItemLayer";
import { Argument } from "nlptoolkit-propbank/dist/Argument";
export declare class EnglishPropbankLayer extends SingleWordMultiItemLayer<Argument> {
    constructor(layerValue: string);
    setLayerValue(layerValue: string): void;
}
