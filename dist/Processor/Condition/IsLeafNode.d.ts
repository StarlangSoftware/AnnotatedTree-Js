import { NodeDrawableCondition } from "./NodeDrawableCondition";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsLeafNode implements NodeDrawableCondition {
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
