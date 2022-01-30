import {NodeDrawableCondition} from "./NodeDrawableCondition";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsLeafNode implements NodeDrawableCondition{

    satisfies(parseNode: ParseNodeDrawable): boolean {
        return parseNode.numberOfChildren() == 0;
    }

}