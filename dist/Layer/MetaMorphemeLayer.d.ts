import { MetaMorphemesMovedLayer } from "./MetaMorphemesMovedLayer";
import { MetamorphicParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
export declare class MetaMorphemeLayer extends MetaMorphemesMovedLayer {
    constructor(layerValue: string);
    setLayerValue(parse: any): void;
    getLayerInfoFrom(index: number): string;
    metaMorphemeRemoveFromIndex(index: number): MetamorphicParse;
}
