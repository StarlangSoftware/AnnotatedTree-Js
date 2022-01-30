import { IsVerbNode } from "./IsVerbNode";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsPredicateVerbNode extends IsVerbNode {
    constructor(wordNet: WordNet);
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
