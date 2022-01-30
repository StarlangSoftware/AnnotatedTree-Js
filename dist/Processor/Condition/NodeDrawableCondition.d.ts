import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export interface NodeDrawableCondition {
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
