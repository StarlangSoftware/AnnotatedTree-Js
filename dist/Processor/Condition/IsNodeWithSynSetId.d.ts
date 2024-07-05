import { IsLeafNode } from "./IsLeafNode";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsNodeWithSynSetId extends IsLeafNode {
    private id;
    /**
     * Stores the synset id to check.
     * @param id Synset id to check
     */
    constructor(id: string);
    /**
     * Checks if at least one of the semantic ids of the parse node is equal to the given id.
     * @param parseNode Parse node to check.
     * @return True if at least one of the semantic ids of the parse node is equal to the given id, false otherwise.
     */
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
