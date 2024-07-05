import {IsNodeWithSynSetId} from "./IsNodeWithSynSetId";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class IsNodeWithPredicate extends IsNodeWithSynSetId{

    /**
     * Stores the synset id to check.
     * @param id Synset id to check
     */
    constructor(id: string) {
        super(id);
    }

    /**
     * Checks if at least one of the semantic ids of the parse node is equal to the given id and also the node is
     * annotated as PREDICATE with semantic role.
     * @param parseNode Parse node to check.
     * @return True if at least one of the semantic ids of the parse node is equal to the given id and also the node is
     * annotated as PREDICATE with semantic role, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean {
        let layerInfo = parseNode.getLayerInfo();
        return super.satisfies(parseNode)
            && layerInfo != null
            && layerInfo.getLayerData(ViewLayerType.PROPBANK) != null
            && layerInfo.getLayerData(ViewLayerType.PROPBANK) == "PREDICATE";
    }

}