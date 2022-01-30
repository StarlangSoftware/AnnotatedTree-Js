import {LeafToStringConverter} from "./LeafToStringConverter";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class LeafToRootFormConverter implements LeafToStringConverter{

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