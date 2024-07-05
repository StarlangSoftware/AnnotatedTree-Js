import { LeafToStringConverter } from "./LeafToStringConverter";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare class LeafToLanguageConverter implements LeafToStringConverter {
    protected viewLayerType: ViewLayerType;
    /**
     * Converts the data in the leaf node to string, except shortcuts to parentheses are converted to its normal forms,
     * '*', '0', '-NONE-' are converted to empty string.
     * @param leafNode Node to be converted to string.
     * @return String form of the data, except shortcuts to parentheses are converted to its normal forms,
     * '*', '0', '-NONE-' are converted to empty string.
     */
    leafConverter(leafNode: ParseNodeDrawable): string;
}
