import { IsLeafNode } from "./IsLeafNode";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsNoneNode extends IsLeafNode {
    private secondLanguage;
    constructor(secondLanguage: ViewLayerType);
    /**
     * Checks if the data of the parse node is '*NONE*'.
     * @param parseNode Parse node to check.
     * @return True if the data of the parse node is '*NONE*', false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
