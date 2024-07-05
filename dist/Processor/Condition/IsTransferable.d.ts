import { IsLeafNode } from "./IsLeafNode";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsTransferable extends IsLeafNode {
    private secondLanguage;
    constructor(secondLanguage: ViewLayerType);
    /**
     * Checks if the node is a leaf node and is not a None or Null node.
     * @param parseNode Parse node to check.
     * @return True if the node is a leaf node and is not a None or Null node, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
