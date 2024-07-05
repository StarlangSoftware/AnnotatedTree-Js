import {IsLeafNode} from "./IsLeafNode";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsNoneNode extends IsLeafNode{

    private secondLanguage: ViewLayerType

    constructor(secondLanguage: ViewLayerType) {
        super();
        this.secondLanguage = secondLanguage
    }

    /**
     * Checks if the data of the parse node is '*NONE*'.
     * @param parseNode Parse node to check.
     * @return True if the data of the parse node is '*NONE*', false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)){
            let data = parseNode.getLayerData(this.secondLanguage);
            return data != null && data == "*NONE*";
        }
        return false;
    }

}