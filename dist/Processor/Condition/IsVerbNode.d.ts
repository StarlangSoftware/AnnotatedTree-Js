import { IsLeafNode } from "./IsLeafNode";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsVerbNode extends IsLeafNode {
    private wordNet;
    constructor(wordNet: WordNet);
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
