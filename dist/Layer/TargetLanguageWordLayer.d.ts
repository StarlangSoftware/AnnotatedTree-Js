import { MultiWordLayer } from "./MultiWordLayer";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare abstract class TargetLanguageWordLayer extends MultiWordLayer<string> {
    constructor(layerValue: string);
    setLayerValue(layerValue: string): void;
    getLayerSize(viewLayer: ViewLayerType): number;
    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string;
}
