import {ParseTreeDrawable} from "../ParseTreeDrawable";
import {NodeModifier} from "./NodeModification/NodeModifier";
import {ParseNodeDrawable} from "../ParseNodeDrawable";

export class TreeModifier{

    private parseTree: ParseTreeDrawable
    private nodeModifier: NodeModifier

    private nodeModifyPrivate(parseNode: ParseNodeDrawable){
        this.nodeModifier.modifier(parseNode);
        for (let i = 0; i < parseNode.numberOfChildren(); i++){
            this.nodeModifyPrivate(<ParseNodeDrawable> parseNode.getChild(i));
        }
    }

    nodeModify(){
        this.nodeModifyPrivate(<ParseNodeDrawable> this.parseTree.getRoot());
    }
}