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
        constructor(id) {
            super(id);
        }
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