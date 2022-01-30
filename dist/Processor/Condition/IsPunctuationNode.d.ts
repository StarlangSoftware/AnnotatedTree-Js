import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsPunctuationNode extends IsLeafNode {
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
