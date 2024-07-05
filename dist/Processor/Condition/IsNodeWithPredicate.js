(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsNodeWithSynSetId", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsNodeWithPredicate = void 0;
    const IsNodeWithSynSetId_1 = require("./IsNodeWithSynSetId");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    class IsNodeWithPredicate extends IsNodeWithSynSetId_1.IsNodeWithSynSetId {
        /**
         * Stores the synset id to check.
         * @param id Synset id to check
         */
        constructor(id) {
            super(id);
        }
        /**
         * Checks if at least one of the semantic ids of the parse node is equal to the given id and also the node is
         * annotated as PREDICATE with semantic role.
         * @param parseNode Parse node to check.
         * @return True if at least one of the semantic ids of the parse node is equal to the given id and also the node is
         * annotated as PREDICATE with semantic role, false otherwise.
         */
        satisfies(parseNode) {
            let layerInfo = parseNode.getLayerInfo();
            return super.satisfies(parseNode)
                && layerInfo != null
                && layerInfo.getLayerData(ViewLayerType_1.ViewLayerType.PROPBANK) != null
                && layerInfo.getLayerData(ViewLayerType_1.ViewLayerType.PROPBANK) == "PREDICATE";
        }
    }
    exports.IsNodeWithPredicate = IsNodeWithPredicate;
});
//# sourceMappingURL=IsNodeWithPredicate.js.map