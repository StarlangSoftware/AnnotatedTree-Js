import {IsLeafNode} from "./IsLeafNode";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {IsNoneNode} from "./IsNoneNode";
import {IsNullElement} from "./IsNullElement";

export class IsTransferable extends IsLeafNode{

    private secondLanguage: ViewLayerType

    constructor(secondLanguage: ViewLayerType) {
        super();
        this.secondLanguage = secondLanguage
    }

    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)) {
            if (new IsNoneNode(this.secondLanguage).satisfies(parseNode)){
                return false;
            }
            return !new IsNullElement().satisfies(parseNode);
        }
        return false;
    }

}