import {IsLeafNode} from "./IsLeafNode";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {Word} from "nlptoolkit-dictionary/dist/Dictionary/Word";

export class IsPunctuationNode extends IsLeafNode{

    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (super.satisfies(parseNode)){
            let data = parseNode.getLayerData(ViewLayerType.ENGLISH_WORD);
            return Word.isPunctuation(data) && data != "$";
        }
        return false;
    }

}