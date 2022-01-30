import {NodeModifier} from "./NodeModifier";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class ConvertToLayeredFormat implements NodeModifier{

    modifier(parseNode: ParseNodeDrawable): void {
        if (parseNode.isLeaf()){
            let name = parseNode.getData().getName();
            parseNode.clearLayers();
            parseNode.getLayerInfo().setLayerData(ViewLayerType.ENGLISH_WORD, name);
            parseNode.clearData();
        }
    }

}