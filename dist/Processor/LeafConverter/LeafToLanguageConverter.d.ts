import { LeafToStringConverter } from "./LeafToStringConverter";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare class LeafToLanguageConverter implements LeafToStringConverter {
    protected viewLayerType: ViewLayerType;
    leafConverter(leafNode: ParseNodeDrawable): string;
}
