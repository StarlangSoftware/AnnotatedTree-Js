import {TreeBank} from "nlptoolkit-parsetree/dist/TreeBank";
import * as fs from "fs";
import {ParseTreeDrawable} from "./ParseTreeDrawable";
import {ParseTree} from "nlptoolkit-parsetree/dist/ParseTree";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class TreeBankDrawable extends TreeBank{

    /**
     * A constructor of {@link TreeBankDrawable} class which reads all {@link ParseTreeDrawable} files with the file
     * name satisfying the given pattern inside the given folder. For each file inside that folder, the constructor
     * creates a ParseTreeDrawable and puts in inside the list parseTrees.
     * @param folder Folder where all parseTrees reside.
     * @param pattern File pattern such as "." ".train" ".test".
     */
    constructor(folder?: string, pattern?: string) {
        super();
        let files = fs.readdirSync(folder);
        files.sort()
        for (let file of files){
            if (pattern != undefined){
                if (!file.includes(pattern)){
                    continue
                }
            }
            let parseTree = new ParseTreeDrawable(folder + "/" + file)
            if (parseTree.getRoot() != undefined){
                parseTree.setName(file);
                this.parseTrees.push(parseTree);
            }
        }
    }

    /**
     * Accessor for the parseTrees attribute
     * @return ParseTrees attribute
     */
    getParseTrees(): Array<ParseTree>{
        return this.parseTrees
    }

    /**
     * Accessor for a specific tree with the given position in the array.
     * @param index Index of the parseTree.
     * @return Tree that is in the position index
     */
    get(index: number): ParseTreeDrawable{
        return <ParseTreeDrawable> this.parseTrees[index];
    }

    /**
     * Clears the given layer for all nodes in all trees
     * @param layerType Layer name
     */
    clearLayer(layerType: ViewLayerType){
        for (let tree of this.parseTrees){
            let parseTree = <ParseTreeDrawable> tree;
            parseTree.clearLayer(layerType);
        }
    }

    removeTree(index: number){
        this.parseTrees.slice(index, 1)
    }

}