import {IsLeafNode} from "./IsLeafNode";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {Pos} from "nlptoolkit-dictionary/dist/Dictionary/Pos";

export class IsVerbNode extends IsLeafNode{

    private wordNet: WordNet

    /**
     * Stores the wordnet for checking the pos tag of the synset.
     * @param wordNet Wordnet used for checking the pos tag of the synset.
     */
    constructor(wordNet: WordNet) {
        super();
        this.wordNet = wordNet
    }

    /**
     * Checks if the node is a leaf node and at least one of the semantic ids of the parse node belong to a verb synset.
     * @param parseNode Parse node to check.
     * @return True if the node is a leaf node and at least one of the semantic ids of the parse node belong to a verb
     * synset, false otherwise.
     */
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