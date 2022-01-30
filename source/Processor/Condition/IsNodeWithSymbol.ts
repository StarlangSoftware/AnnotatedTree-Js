import {NodeDrawableCondition} from "./NodeDrawableCondition";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsNodeWithSymbol implements NodeDrawableCondition{

    private symbol: string

    constructor(symbol: string) {
        this.symbol = symbol
    }

    satisfies(parseNode: ParseNodeDrawable): boolean {
        if (parseNode.numberOfChildren() > 0){
            return parseNode.getData().toString() == this.symbol;
        } else {
            return false;
        }
    }

}