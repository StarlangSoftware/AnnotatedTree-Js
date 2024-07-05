import {IsLeafNode} from "./IsLeafNode";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsNodeWithSynSetId extends IsLeafNode{

    private id: string

    /**
     * Stores the synset id to check.
     * @param id Synset id to check
     */
    constructor(id: string) {
        super();
        this.id = id
    }

    /**
     * Checks if at least one of the semantic ids of the parse node is equal to the given id.
     * @param parseNode Parse node to check.
     * @return True if at least one of the semantic ids of the parse node is equal to the given id, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)){
            let layerInfo = parseNode.getLayerInfo();
            for (let i = 0; i < layerInfo.getNumberOfMeanings(); i++) {
                let synSetId = layerInfo.getSemanticAt(i);
                if (synSetId == this.id){
                    return true;
                }
            }
        }
        return false;
    }

}