import { TreeBank } from "nlptoolkit-parsetree/dist/TreeBank";
import { ParseTreeDrawable } from "./ParseTreeDrawable";
import { ParseTree } from "nlptoolkit-parsetree/dist/ParseTree";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare class TreeBankDrawable extends TreeBank {
    constructor(folder?: string, pattern?: string);
    getParseTrees(): Array<ParseTree>;
    get(index: number): ParseTreeDrawable;
    clearLayer(layerType: ViewLayerType): void;
    removeTree(index: number): void;
}
