import { NodeDrawableCondition } from "./NodeDrawableCondition";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsLeafNode implements NodeDrawableCondition {
    /**
     * Checks if the parse node is a leaf node, i.e., it has no child.
     * @param parseNode Parse node to check.
     * @return True if the parse node is a leaf node, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
