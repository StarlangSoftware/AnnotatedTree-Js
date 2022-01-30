import { IsNodeWithSynSetId } from "./IsNodeWithSynSetId";
import { ParseNodeDrawable } from "../../ParseNodeDrawable";
export declare class IsNodeWithPredicate extends IsNodeWithSynSetId {
    constructor(id: string);
    satisfies(parseNode: ParseNodeDrawable): boolean;
}
