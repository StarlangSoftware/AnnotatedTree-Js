import { ParseNode } from "nlptoolkit-parsetree/dist/ParseNode";
import { LayerInfo } from "./LayerInfo";
import { Symbol } from "nlptoolkit-parsetree/dist/Symbol";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { Gazetteer } from "nlptoolkit-namedentityrecognition/dist/Gazetteer";
export declare class ParseNodeDrawable extends ParseNode {
    protected layers: LayerInfo;
    protected depth: number;
    protected inOrderTraversalIndex: number;
    constructor(parentOrLeftOrSymbol?: any, lineOrRightOrData?: any, dataOrIsleaf?: any, depth?: number);
    getLayerInfo(): LayerInfo;
    getData(): Symbol;
    clearLayers(): void;
    clearLayer(layerType: ViewLayerType): void;
    clearData(): void;
    setDataAndClearLayers(data: Symbol): void;
    setData(data: Symbol): void;
    headWord(viewLayerType: ViewLayerType): string;
    getLayerData(viewLayer?: ViewLayerType): string;
    getDepth(): number;
    replaceChild(oldChild: ParseNodeDrawable, newChild: ParseNodeDrawable): void;
    updateDepths(depth: number): void;
    maxDepth(): number;
    layerExists(viewLayerType: ViewLayerType): boolean;
    isDummyNode(): boolean;
    layerAll(viewLayerType: ViewLayerType): boolean;
    toTurkishSentence(): string;
    checkGazetteer(gazetteer: Gazetteer, word: string): void;
    generateParseNode(parseNode: ParseNode, surfaceForm: boolean): void;
    toString(): string;
}
