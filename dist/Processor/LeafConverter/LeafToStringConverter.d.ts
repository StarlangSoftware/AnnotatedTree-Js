import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export interface LeafToStringConverter {
    leafConverter(leafNode: ParseNodeDrawable): string;
}
