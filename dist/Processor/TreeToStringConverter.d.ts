import { LeafToStringConverter } from "./LeafConverter/LeafToStringConverter";
import { ParseTreeDrawable } from "../ParseTreeDrawable";
export declare class TreeToStringConverter {
    private converter;
    private parseTree;
    /**
     * Constructor of the TreeToStringConverter class. Sets the attributes.
     * @param parseTree Parse tree to be converted.
     * @param converter Node to string converter interface.
     */
    constructor(parseTree: ParseTreeDrawable, converter: LeafToStringConverter);
    /**
     * Converts recursively a parse node to a string. If it is a leaf node, calls the converter's leafConverter method,
     * otherwise concatenates the converted strings of its children.
     * @param parseNode Parse node to convert to string.
     * @return String form of the parse node and all of its descendants.
     */
    private convertToString;
    /**
     * Calls the convertToString method with root of the tree to convert the parse tree to string.
     * @return String form of the parse tree.
     */
    convert(): string;
}
