import {IsLeafNode} from "./IsLeafNode";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class IsNumber extends IsLeafNode{

    /**
     * Checks if the node is a leaf node and contains numerals as the data and its parent has the tag CD.
     * @param parseNode Parse node to check.
     * @return True if the node is a leaf node and contains numerals as the data and its parent has the tag CD, false
     * otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)){
            let data = parseNode.getLayerData(ViewLayerType.ENGLISH_WORD);
            let parentData = parseNode.getParent().getData().getName();
            return parentData == "CD" && !Number.isNaN(data);
        }
        return false;
    }

}