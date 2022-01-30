import {IsLeafNode} from "./IsLeafNode";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsProperNoun extends IsLeafNode{

    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)){
            let parentData = parseNode.getParent().getData().getName();
            return parentData == "NNP" || parentData == "NNPS";
        }
        return false;
    }

}