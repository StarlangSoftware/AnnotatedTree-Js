import { LeafListCondition } from "./LeafListCondition";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare class SemiContainsLayerInformation implements LeafListCondition {
    private readonly viewLayerType;
    constructor(viewLayerType: ViewLayerType);
    satisfies(leafList: Array<ParseNodeDrawable>): boolean;
}
