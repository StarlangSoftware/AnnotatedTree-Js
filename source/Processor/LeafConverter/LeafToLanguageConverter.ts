import {LeafToStringConverter} from "./LeafToStringConverter";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class LeafToLanguageConverter implements LeafToStringConverter{

    protected viewLayerType: ViewLayerType

    /**
     * Converts the data in the leaf node to string, except shortcuts to parentheses are converted to its normal forms,
     * '*', '0', '-NONE-' are converted to empty string.
     * @param leafNode Node to be converted to string.
     * @return String form of the data, except shortcuts to parentheses are converted to its normal forms,
     * '*', '0', '-NONE-' are converted to empty string.
     */
    leafConverter(leafNode: ParseNodeDrawable): string {
        let layerData = leafNode.getLayerData(this.viewLayerType);
        let parentLayerData = (<ParseNodeDrawable>leafNode.getParent()).getLayerData(this.viewLayerType);
        if (layerData != null){
            if (layerData.includes("*") || (layerData == "0" && parentLayerData == "-NONE-")){
                return "";
            } else {
                return " " + layerData
                    .replace("-LRB-", "(")
                    .replace("-RRB-", ")")
                    .replace("-LSB-", "[")
                    .replace("-RSB-", "]")
                    .replace("-LCB-", "{")
                    .replace("-RCB-", "}")
                    .replace("-lrb-", "(")
                    .replace("-rrb-", ")")
                    .replace("-lsb-", "[")
                    .replace("-rsb-", "]")
                    .replace("-lcb-", "{")
                    .replace("-rcb-", "}");
            }
        } else {
            return "";
        }
    }

}