import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsTurkishLeafNode extends IsLeafNode {
    /**
     * Checks if the parse node is a leaf node and contains a valid Turkish word in its data.
     * @param parseNode Parse node to check.
     * @return True if the parse node is a leaf node and contains a valid Turkish word in its data; false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
