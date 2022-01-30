import { NodeDrawableCondition } from "./NodeDrawableCondition";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsDoubleNodeWithDifferentTags implements NodeDrawableCondition {
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
