import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsNullElement extends IsLeafNode {
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
