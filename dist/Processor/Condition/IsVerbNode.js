(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsLeafNode", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "nlptoolkit-dictionary/dist/Dictionary/Pos"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsVerbNode = void 0;
    const IsLeafNode_1 = require("./IsLeafNode");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const Pos_1 = require("nlptoolkit-dictionary/dist/Dictionary/Pos");
    class IsVerbNode extends IsLeafNode_1.IsLeafNode {
        /**
         * Stores the wordnet for checking the pos tag of the synset.
         * @param wordNet Wordnet used for checking the pos tag of the synset.
         */
        constructor(wordNet) {
            super();
            this.wordNet = wordNet;
        }
        /**
         * Checks if the node is a leaf node and at least one of the semantic ids of the parse node belong to a verb synset.
         * @param parseNode Parse node to check.
         * @return True if the node is a leaf node and at least one of the semantic ids of the parse node belong to a verb
         * synset, false otherwise.
         */
        satisfies(parseNode) {
            let layerInfo = parseNode.getLayerInfo();
            if (super.satisfies(parseNode) && layerInfo != null && layerInfo.getLayerData(ViewLayerType_1.ViewLayerType.SEMANTICS) != null) {
                for (let i = 0; i < layerInfo.getNumberOfMeanings(); i++) {
                    let synSetId = layerInfo.getSemanticAt(i);
                    if (this.wordNet.getSynSetWithId(synSetId) != null && this.wordNet.getSynSetWithId(synSetId).getPos() == Pos_1.Pos.VERB) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
    exports.IsVerbNode = IsVerbNode;
});
//# sourceMappingURL=IsVerbNode.js.map