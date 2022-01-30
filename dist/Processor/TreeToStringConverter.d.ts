import { LeafToStringConverter } from "./LeafConverter/LeafToStringConverter";
import { ParseTreeDrawable } from "../ParseTreeDrawable";
export declare class TreeToStringConverter {
    private converter;
    private parseTree;
    constructor(parseTree: ParseTreeDrawable, converter: LeafToStringConverter);
    private convertToString;
    convert(): string;
}
