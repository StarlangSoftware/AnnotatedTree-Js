import { LeafToStringConverter } from "./LeafToStringConverter";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class LeafToRootFormConverter implements LeafToStringConverter {
    /**
     * Converts the data in the leaf node to string. If there are multiple words in the leaf node, they are concatenated
     * with space.
     * @param parseNodeDrawable Node to be converted to string.
     * @return String form of the data. If there are multiple words in the leaf node, they are concatenated
     * with space.
     */
    leafConverter(parseNodeDrawable: ParseNodeDrawable): string;
}
