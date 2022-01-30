import { MultiWordMultiItemLayer } from "./MultiWordMultiItemLayer";
import { MorphologicalParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalParse";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare class MorphologicalAnalysisLayer extends MultiWordMultiItemLayer<MorphologicalParse> {
    constructor(layerValue: string);
    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string;
    getLayerSize(viewLayer: ViewLayerType): number;
    setLayerValue(layerValue: any): void;
    isVerbal(): boolean;
    isNominal(): boolean;
}
