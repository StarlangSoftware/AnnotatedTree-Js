import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsProperNoun extends IsLeafNode {
    /**
     * Checks if the node is a leaf node and its parent has the tag NNP or NNPS.
     * @param parseNode Parse node to check.
     * @return True if the node is a leaf node and its parent has the tag NNP or NNPS, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
