import { TreeBank } from "nlptoolkit-parsetree/dist/TreeBank";
import { ParseTreeDrawable } from "./ParseTreeDrawable";
import { ParseTree } from "nlptoolkit-parsetree/dist/ParseTree";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare class TreeBankDrawable extends TreeBank {
    /**
     * A constructor of {@link TreeBankDrawable} class which reads all {@link ParseTreeDrawable} files with the file
     * name satisfying the given pattern inside the given folder. For each file inside that folder, the constructor
     * creates a ParseTreeDrawable and puts in inside the list parseTrees.
     * @param folder Folder where all parseTrees reside.
     * @param pattern File pattern such as "." ".train" ".test".
     */
    constructor(folder?: string, pattern?: string);
    /**
     * Accessor for the parseTrees attribute
     * @return ParseTrees attribute
     */
    getParseTrees(): Array<ParseTree>;
    /**
     * Accessor for a specific tree with the given position in the array.
     * @param index Index of the parseTree.
     * @return Tree that is in the position index
     */
    get(index: number): ParseTreeDrawable;
    /**
     * Clears the given layer for all nodes in all trees
     * @param layerType Layer name
     */
    clearLayer(layerType: ViewLayerType): void;
    removeTree(index: number): void;
}
