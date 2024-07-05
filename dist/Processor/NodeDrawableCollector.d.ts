import { NodeDrawableCondition } from "./Condition/NodeDrawableCondition";
import { ParseNodeDrawable } from "../ParseNodeDrawable";
export declare class NodeDrawableCollector {
    private condition;
    private rootNode;
    /**
     * Constructor for the NodeDrawableCollector class. NodeDrawableCollector's main aim is to collect a set of
     * ParseNode's from a subtree rooted at rootNode, where the ParseNode's satisfy a given NodeCondition, which is
     * implemented by other interface class.
     * @param rootNode Root node of the subtree
     * @param condition The condition interface for which all nodes in the subtree rooted at rootNode will be checked
     */
    constructor(rootNode: ParseNodeDrawable, condition: NodeDrawableCondition);
    /**
     * Private recursive method to check all descendants of the parseNode, if they ever satisfy the given node condition
     * @param parseNode Root node of the subtree
     * @param collected The {@link ArrayList} where the collected ParseNode's will be stored.
     */
    private collectNodes;
    /**
     * Collects and returns all ParseNodes satisfying the node condition.
     * @return All ParseNodes satisfying the node condition.
     */
    collect(): Array<ParseNodeDrawable>;
}
