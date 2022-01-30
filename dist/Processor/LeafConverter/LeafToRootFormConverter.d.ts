import { LeafToStringConverter } from "./LeafToStringConverter";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class LeafToRootFormConverter implements LeafToStringConverter {
    leafConverter(parseNodeDrawable: ParseNodeDrawable): string;
}
