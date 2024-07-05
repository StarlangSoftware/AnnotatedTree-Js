(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsVerbNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsPredicateVerbNode = void 0;
    const IsVerbNode_1 = require("./IsVerbNode");
    class IsPredicateVerbNode extends IsVerbNode_1.IsVerbNode {
        /**
         * Stores the wordnet for checking the pos tag of the synset.
         * @param wordNet Wordnet used for checking the pos tag of the synset.
         */
        constructor(wordNet) {
            super(wordNet);
        }
        /**
         * Checks if the node is a leaf node and at least one of the semantic ids of the parse node belong to a verb synset,
         * and the semantic role of the node is PREDICATE.
         * @param parseNode Parse node to check.
         * @return True if the node is a leaf node and at least one of the semantic ids of the parse node belong to a verb
         *          synset and the semantic role of the node is PREDICATE, false otherwise.
         */
        satisfies(parseNode) {
            let layerInfo = parseNode.getLayerInfo();
            return super.satisfies(parseNode)
                && layerInfo != null
                && layerInfo.getArgument() != null
                && layerInfo.getArgument().getArgumentType() == "PREDICATE";
        }
    }
    exports.IsPredicateVerbNode = IsPredicateVerbNode;
});
//# sourceMappingURL=IsPredicateVerbNode.js.map