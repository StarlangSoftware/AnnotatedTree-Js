import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsEnglishLeafNode extends IsLeafNode {
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
