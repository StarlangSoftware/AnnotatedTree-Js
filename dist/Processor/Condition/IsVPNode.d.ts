import { NodeDrawableCondition } from "./NodeDrawableCondition";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsVPNode implements NodeDrawableCondition {
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
