import {NodeDrawableCondition} from "./NodeDrawableCondition";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsNodeWithSymbol implements NodeDrawableCondition{

    private symbol: string

    /**
     * Stores the symbol to check.
     * @param symbol Symbol to check
     */
    constructor(symbol: string) {
        this.symbol = symbol
    }

    /**
     * Checks if the tag of the parse node is equal to the given symbol.
     * @param parseNode Parse node to check.
     * @return True if the tag of the parse node is equal to the given symbol, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (parseNode.numberOfChildren() > 0){
            return parseNode.getData().toString() == this.symbol;
        } else {
            return false;
        }
    }

}