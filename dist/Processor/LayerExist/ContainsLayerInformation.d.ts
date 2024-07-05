import { LeafListCondition } from "./LeafListCondition";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare class ContainsLayerInformation implements LeafListCondition {
    private readonly viewLayerType;
    /**
     * Constructor for ContainsLayerInformation class. Sets the viewLayerType attribute.
     * @param viewLayerType Layer for which check is done.
     */
    constructor(viewLayerType: ViewLayerType);
    /**
     * Checks if all leaf nodes in the leafList contains the given layer information.
     * @param leafList Array list storing the leaf nodes.
     * @return True if all leaf nodes in the leafList contains the given layer information, false otherwise.
     */
    satisfies(leafList: Array<ParseNodeDrawable>): boolean;
}
