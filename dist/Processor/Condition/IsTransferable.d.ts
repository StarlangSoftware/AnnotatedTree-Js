import { IsLeafNode } from "./IsLeafNode";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsTransferable extends IsLeafNode {
    private secondLanguage;
    constructor(secondLanguage: ViewLayerType);
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
