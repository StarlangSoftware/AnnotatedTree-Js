import {NodeDrawableCondition} from "./NodeDrawableCondition";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsDoubleNodeWithDifferentTags implements NodeDrawableCondition{

    satisfies(parseNode: ParseNodeDrawable): boolean {
        return parseNode.numberOfChildren() == 1
            && parseNode.getChild(0).numberOfChildren() >= 1
            && !parseNode.getChild(0).isLeaf()
            && parseNode.getData() != parseNode.getChild(0).getData();
    }

}