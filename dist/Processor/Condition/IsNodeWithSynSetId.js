(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsLeafNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsNodeWithSynSetId = void 0;
    const IsLeafNode_1 = require("./IsLeafNode");
    class IsNodeWithSynSetId extends IsLeafNode_1.IsLeafNode {
        /**
         * Stores the synset id to check.
         * @param id Synset id to check
         */
        constructor(id) {
            super();
            this.id = id;
        }
        /**
         * Checks if at least one of the semantic ids of the parse node is equal to the given id.
         * @param parseNode Parse node to check.
         * @return True if at least one of the semantic ids of the parse node is equal to the given id, false otherwise.
         */
        satisfies(parseNode) {
            if (super.satisfies(parseNode)) {
                let layerInfo = parseNode.getLayerInfo();
                for (let i = 0; i < layerInfo.getNumberOfMeanings(); i++) {
                    let synSetId = layerInfo.getSemanticAt(i);
                    if (synSetId == this.id) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
    exports.IsNodeWithSynSetId = IsNodeWithSynSetId;
});
//# sourceMappingURL=IsNodeWithSynSetId.js.map