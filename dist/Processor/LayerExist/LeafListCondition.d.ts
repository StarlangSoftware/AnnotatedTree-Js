import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export interface LeafListCondition {
    satisfies(leafList: Array<ParseNodeDrawable>): boolean;
}
