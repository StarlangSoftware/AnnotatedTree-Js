import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { MorphologicalParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalParse";
import { MetamorphicParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
import { Argument } from "nlptoolkit-propbank/dist/Argument";
import { AnnotatedWord } from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";
export declare class LayerInfo {
    private layers;
    constructor(info?: string);
    setLayerData(viewLayer: ViewLayerType, layerValue: string): void;
    setMorphologicalAnalysis(parse: MorphologicalParse): void;
    setMetaMorphemes(parse: MetamorphicParse): void;
    layerExists(viewLayerType: ViewLayerType): boolean;
    checkLayer(viewLayer: ViewLayerType): ViewLayerType;
    getNumberOfWords(): number;
    private getMultiWordAt;
    getTurkishWordAt(index: number): string;
    getNumberOfMeanings(): number;
    getSemanticAt(index: number): string;
    getShallowParseAt(index: number): string;
    getArgument(): Argument;
    getArgumentAt(index: number): Argument;
    getMorphologicalParseAt(index: number): MorphologicalParse;
    getMetamorphicParseAt(index: number): MetamorphicParse;
    getMetaMorphemeAtIndex(index: number): string;
    getMetaMorphemeFromIndex(index: number): string;
    getLayerSize(viewLayer: ViewLayerType): number;
    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string;
    getLayerDescription(): string;
    getLayerData(viewLayer: ViewLayerType): string;
    getRobustLayerData(viewLayer: ViewLayerType): string;
    private updateMetaMorphemesMoved;
    removeLayer(layerType: ViewLayerType): void;
    metaMorphemeClear(): void;
    englishClear(): void;
    dependencyClear(): void;
    metaMorphemesMovedClear(): void;
    semanticClear(): void;
    englishSemanticClear(): void;
    morphologicalAnalysisClear(): void;
    metaMorphemeRemove(index: number): MetamorphicParse;
    isVerbal(): boolean;
    isNominal(): boolean;
    divideIntoWords(): Array<LayerInfo>;
    toAnnotatedWord(wordIndex: number): AnnotatedWord;
}
