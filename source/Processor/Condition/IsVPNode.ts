import {NodeDrawableCondition} from "./NodeDrawableCondition";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsVPNode implements NodeDrawableCondition{

    satisfies(parseNode: ParseNodeDrawable): boolean {
        return parseNode.numberOfChildren() > 0 && parseNode.getData().isVP();
    }

}