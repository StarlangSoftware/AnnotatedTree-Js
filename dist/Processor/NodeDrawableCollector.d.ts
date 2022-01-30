import { NodeDrawableCondition } from "./Condition/NodeDrawableCondition";
import { ParseNodeDrawable } from "../ParseNodeDrawable";
export declare class NodeDrawableCollector {
    private condition;
    private rootNode;
    constructor(rootNode: ParseNodeDrawable, condition: NodeDrawableCondition);
    private collectNodes;
    collect(): Array<ParseNodeDrawable>;
}
