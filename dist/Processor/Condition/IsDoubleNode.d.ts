import { NodeDrawableCondition } from "./NodeDrawableCondition";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsDoubleNode implements NodeDrawableCondition {
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
