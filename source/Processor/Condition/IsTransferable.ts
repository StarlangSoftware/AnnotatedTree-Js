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

    /**
     * Checks if the node is a leaf node and is not a None or Null node.
     * @param parseNode Parse node to check.
     * @return True if the node is a leaf node and is not a None or Null node, false otherwise.
     */
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