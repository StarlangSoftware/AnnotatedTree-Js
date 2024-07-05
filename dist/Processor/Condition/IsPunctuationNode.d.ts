import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsPunctuationNode extends IsLeafNode {
    /**
     * Checks if the node is a leaf node and contains punctuation as the data.
     * @param parseNode Parse node to check.
     * @return True if the node is a leaf node and contains punctuation as the data, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
