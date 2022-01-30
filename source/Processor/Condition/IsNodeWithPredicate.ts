import {IsNodeWithSynSetId} from "./IsNodeWithSynSetId";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class IsNodeWithPredicate extends IsNodeWithSynSetId{

    constructor(id: string) {
        super(id);
    }

    satisfies(parseNode: ParseNodeDrawable): boolean {
        let layerInfo = parseNode.getLayerInfo();
        return super.satisfies(parseNode)
            && layerInfo != null
            && layerInfo.getLayerData(ViewLayerType.PROPBANK) != null
            && layerInfo.getLayerData(ViewLayerType.PROPBANK) == "PREDICATE";
    }

}