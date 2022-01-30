import { MultiWordMultiItemLayer } from "./MultiWordMultiItemLayer";
import { MetamorphicParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare class MetaMorphemesMovedLayer extends MultiWordMultiItemLayer<MetamorphicParse> {
    constructor(layerValue: string);
    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string;
    getLayerSize(viewLayer: ViewLayerType): number;
    setLayerValue(layerValue: string): void;
}
