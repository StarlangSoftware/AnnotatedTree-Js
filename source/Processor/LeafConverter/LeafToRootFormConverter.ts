import {LeafToStringConverter} from "./LeafToStringConverter";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class LeafToRootFormConverter implements LeafToStringConverter{

    /**
     * Converts the data in the leaf node to string. If there are multiple words in the leaf node, they are concatenated
     * with space.
     * @param parseNodeDrawable Node to be converted to string.
     * @return String form of the data. If there are multiple words in the leaf node, they are concatenated
     * with space.
     */
    leafConverter(parseNodeDrawable: ParseNodeDrawable): string {
        let layerInfo = parseNodeDrawable.getLayerInfo();
        let rootWords = " ";
        for (let i = 0; i < layerInfo.getNumberOfWords(); i++) {
            let root = layerInfo.getMorphologicalParseAt(i).getWord().getName();
            if (root != null && root != ""){
                rootWords += " " + root;
            }
        }
        return rootWords.toString();
    }

}