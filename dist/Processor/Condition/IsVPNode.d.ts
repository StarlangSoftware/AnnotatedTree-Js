import { NodeDrawableCondition } from "./NodeDrawableCondition";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsVPNode implements NodeDrawableCondition {
    /**
     * Checks if the node is not a leaf node and its tag is VP.
     * @param parseNode Parse node to check.
     * @return True if the node is not a leaf node and its tag is VP, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
