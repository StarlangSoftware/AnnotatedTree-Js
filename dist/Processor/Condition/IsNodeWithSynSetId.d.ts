import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsNodeWithSynSetId extends IsLeafNode {
    private id;
    constructor(id: string);
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
