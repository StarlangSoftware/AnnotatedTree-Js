import {IsLeafNode} from "./IsLeafNode";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";

export class IsPunctuationNode extends IsLeafNode{

    /**
     * Checks if the node is a leaf node and contains punctuation as the data.
     * @param parseNode Parse node to check.
     * @return True if the node is a leaf node and contains punctuation as the data, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)){
            let data = parseNode.getLayerData(ViewLayerType.ENGLISH_WORD);
            return Word.isPunctuation(data) && data != "$";
        }
        return false;
    }

}