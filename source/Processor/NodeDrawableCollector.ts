import {NodeDrawableCondition} from "./Condition/NodeDrawableCondition";
import {ParseNodeDrawable} from "../ParseNodeDrawable";

export class NodeDrawableCollector {

    private condition: NodeDrawableCondition
    private rootNode: ParseNodeDrawable

    constructor(rootNode: ParseNodeDrawable, condition: NodeDrawableCondition) {
        this.rootNode = rootNode
        this.condition = condition
    }

    private collectNodes(parseNode: ParseNodeDrawable, collected: Array<ParseNodeDrawable>){
        if (this.condition == null || this.condition.satisfies(parseNode)){
            collected.push(parseNode);
        }
        for (let i = 0; i < parseNode.numberOfChildren(); i++){
            this.collectNodes(<ParseNodeDrawable>parseNode.getChild(i), collected);
        }
    }

    collect(): Array<ParseNodeDrawable>{
        let result = new Array<ParseNodeDrawable>();
        this.collectNodes(this.rootNode, result);
        return result;
    }
}