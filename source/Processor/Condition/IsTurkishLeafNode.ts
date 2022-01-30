import {IsLeafNode} from "./IsLeafNode";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class IsTurkishLeafNode extends IsLeafNode{

    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)){
            let data = parseNode.getLayerInfo().getLayerData(ViewLayerType.TURKISH_WORD);
            let parentData = parseNode.getParent().getData().getName();
            return data != null && !data.includes("*") && !(data == "0" && parentData == "-NONE-");
        }
        return false;
    }

}