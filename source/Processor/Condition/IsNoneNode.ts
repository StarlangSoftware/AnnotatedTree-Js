import {IsLeafNode} from "./IsLeafNode";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsNoneNode extends IsLeafNode{

    private secondLanguage: ViewLayerType

    constructor(secondLanguage: ViewLayerType) {
        super();
        this.secondLanguage = secondLanguage
    }

    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)){
            let data = parseNode.getLayerData(this.secondLanguage);
            return data != null && data == "*NONE*";
        }
        return false;
    }

}