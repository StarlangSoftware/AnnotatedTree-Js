import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsNumber extends IsLeafNode {
    /**
     * Checks if the node is a leaf node and contains numerals as the data and its parent has the tag CD.
     * @param parseNode Parse node to check.
     * @return True if the node is a leaf node and contains numerals as the data and its parent has the tag CD, false
     * otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
