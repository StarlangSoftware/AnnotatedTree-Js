import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsNumber extends IsLeafNode {
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
