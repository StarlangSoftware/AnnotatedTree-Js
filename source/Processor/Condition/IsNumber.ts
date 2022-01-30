import {IsLeafNode} from "./IsLeafNode";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class IsNumber extends IsLeafNode{

    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)){
            let data = parseNode.getLayerData(ViewLayerType.ENGLISH_WORD);
            let parentData = parseNode.getParent().getData().getName();
            return parentData == "CD" && !Number.isNaN(data);
        }
        return false;
    }

}