import {TreeBank} from "nlptoolkit-parsetree/dist/TreeBank";
import * as fs from "fs";
import {ParseTreeDrawable} from "./ParseTreeDrawable";
import {FileDescription} from "nlptoolkit-corpus/dist/FileDescription";
import {ParseTree} from "nlptoolkit-parsetree/dist/ParseTree";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class TreeBankDrawable extends TreeBank{

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

    getParseTrees(): Array<ParseTree>{
        return this.parseTrees
    }

    get(index: number): ParseTreeDrawable{
        return <ParseTreeDrawable> this.parseTrees[index];
    }

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