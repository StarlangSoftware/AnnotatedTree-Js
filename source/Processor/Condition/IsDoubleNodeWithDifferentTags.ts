import {NodeDrawableCondition} from "./NodeDrawableCondition";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsDoubleNodeWithDifferentTags implements NodeDrawableCondition{

    /**
     * Checks if the parse node is a double node, i.e., it has one child and his child has one or more children; and its
     * tag is not equal to its child tag.
     * @param parseNode Parse node to check
     * @return True if the tag of the parse node is not equal to the tag of its child node, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean {
        return parseNode.numberOfChildren() == 1
            && parseNode.getChild(0).numberOfChildren() >= 1
            && !parseNode.getChild(0).isLeaf()
            && parseNode.getData() != parseNode.getChild(0).getData();
    }

}