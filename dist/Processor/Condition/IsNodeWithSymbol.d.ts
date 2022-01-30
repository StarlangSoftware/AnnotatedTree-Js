import { NodeDrawableCondition } from "./NodeDrawableCondition";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsNodeWithSymbol implements NodeDrawableCondition {
    private symbol;
    constructor(symbol: string);
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
