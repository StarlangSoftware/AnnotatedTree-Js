import {IsVerbNode} from "./IsVerbNode";
import {WordNet} from "nlptoolkit-wordnet/dist/WordNet";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";

export class IsPredicateVerbNode extends IsVerbNode{

    constructor(wordNet: WordNet) {
        super(wordNet);
    }

    satisfies(parseNode: ParseNodeDrawable): boolean {
        let layerInfo = parseNode.getLayerInfo();
        return super.satisfies(parseNode)
            && layerInfo != null
            && layerInfo.getArgument() != null
            && layerInfo.getArgument().getArgumentType() == "PREDICATE";
    }

}