import {IsLeafNode} from "./IsLeafNode";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsNodeWithSynSetId extends IsLeafNode{

    private id: string

    constructor(id: string) {
        super();
        this.id = id
    }

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