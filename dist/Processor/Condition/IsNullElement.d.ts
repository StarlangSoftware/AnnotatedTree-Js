import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsNullElement extends IsLeafNode {
    /**
     * Checks if the parse node is a leaf node and its data is '*' and its parent's data is '-NONE-'.
     * @param parseNode Parse node to check.
     * @return True if the parse node is a leaf node and its data is '*' and its parent's data is '-NONE-', false
     * otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
