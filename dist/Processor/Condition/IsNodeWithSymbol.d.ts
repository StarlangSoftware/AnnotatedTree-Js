import { NodeDrawableCondition } from "./NodeDrawableCondition";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsNodeWithSymbol implements NodeDrawableCondition {
    private symbol;
    /**
     * Stores the symbol to check.
     * @param symbol Symbol to check
     */
    constructor(symbol: string);
    /**
     * Checks if the tag of the parse node is equal to the given symbol.
     * @param parseNode Parse node to check.
     * @return True if the tag of the parse node is equal to the given symbol, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
