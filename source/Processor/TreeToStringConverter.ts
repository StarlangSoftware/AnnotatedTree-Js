import {LeafToStringConverter} from "./LeafConverter/LeafToStringConverter";
import {ParseTreeDrawable} from "../ParseTreeDrawable";
import {ParseNodeDrawable} from "../ParseNodeDrawable";

export class TreeToStringConverter {

    private converter: LeafToStringConverter
    private parseTree: ParseTreeDrawable

    constructor(parseTree: ParseTreeDrawable, converter: LeafToStringConverter) {
        this.converter = converter
        this.parseTree = parseTree
    }

    private convertToString(parseNode: ParseNodeDrawable): string{
        if (parseNode.isLeaf()){
            return this.converter.leafConverter(parseNode);
        } else {
            let st = "";
            for (let i = 0; i < parseNode.numberOfChildren(); i++) {
                st = st + this.convertToString(<ParseNodeDrawable> parseNode.getChild(i));
            }
            return st;
        }
    }

    convert(){
        return this.convertToString(<ParseNodeDrawable> this.parseTree.getRoot());
    }

}