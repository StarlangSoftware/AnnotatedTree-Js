import {IsLeafNode} from "./IsLeafNode";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {IsNullElement} from "./IsNullElement";

export class IsEnglishLeafNode extends IsLeafNode{

    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)) {
            return !new IsNullElement().satisfies(parseNode);
        }
        return false;
    }

}