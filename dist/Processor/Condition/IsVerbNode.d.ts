import { IsLeafNode } from "./IsLeafNode";
import { WordNet } from "nlptoolkit-wordnet/dist/WordNet";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsVerbNode extends IsLeafNode {
    private wordNet;
    /**
     * Stores the wordnet for checking the pos tag of the synset.
     * @param wordNet Wordnet used for checking the pos tag of the synset.
     */
    constructor(wordNet: WordNet);
    /**
     * Checks if the node is a leaf node and at least one of the semantic ids of the parse node belong to a verb synset.
     * @param parseNode Parse node to check.
     * @return True if the node is a leaf node and at least one of the semantic ids of the parse node belong to a verb
     * synset, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
