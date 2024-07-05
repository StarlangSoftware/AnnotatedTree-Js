import {LeafToStringConverter} from "./LeafConverter/LeafToStringConverter";
import {ParseTreeDrawable} from "../ParseTreeDrawable";
import {ParseNodeDrawable} from "../ParseNodeDrawable";

export class TreeToStringConverter {

    private converter: LeafToStringConverter
    private parseTree: ParseTreeDrawable

    /**
     * Constructor of the TreeToStringConverter class. Sets the attributes.
     * @param parseTree Parse tree to be converted.
     * @param converter Node to string converter interface.
     */
    constructor(parseTree: ParseTreeDrawable, converter: LeafToStringConverter) {
        this.converter = converter
        this.parseTree = parseTree
    }

    /**
     * Converts recursively a parse node to a string. If it is a leaf node, calls the converter's leafConverter method,
     * otherwise concatenates the converted strings of its children.
     * @param parseNode Parse node to convert to string.
     * @return String form of the parse node and all of its descendants.
     */
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

    /**
     * Calls the convertToString method with root of the tree to convert the parse tree to string.
     * @return String form of the parse tree.
     */
    convert(){
        return this.convertToString(<ParseNodeDrawable> this.parseTree.getRoot());
    }

}