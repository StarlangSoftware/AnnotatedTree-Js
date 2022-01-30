import {IsLeafNode} from "./IsLeafNode";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {Pos} from "nlptoolkit-dictionary/dist/Dictionary/Pos";

export class IsVerbNode extends IsLeafNode{

    private wordNet: WordNet

    constructor(wordNet: WordNet) {
        super();
        this.wordNet = wordNet
    }

    satisfies(parseNode: ParseNodeDrawable): boolean {
        let layerInfo = parseNode.getLayerInfo();
        if (super.satisfies(parseNode) && layerInfo != null && layerInfo.getLayerData(ViewLayerType.SEMANTICS) != null){
            for (let i = 0; i < layerInfo.getNumberOfMeanings(); i++){
                let synSetId = layerInfo.getSemanticAt(i);
                if (this.wordNet.getSynSetWithId(synSetId) != null && this.wordNet.getSynSetWithId(synSetId).getPos() == Pos.VERB){
                    return true;
                }
            }
        }
        return false;
    }

}