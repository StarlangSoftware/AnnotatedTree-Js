(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsLeafNode", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsNumber = void 0;
    const IsLeafNode_1 = require("./IsLeafNode");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    class IsNumber extends IsLeafNode_1.IsLeafNode {
        /**
         * Checks if the node is a leaf node and contains numerals as the data and its parent has the tag CD.
         * @param parseNode Parse node to check.
         * @return True if the node is a leaf node and contains numerals as the data and its parent has the tag CD, false
         * otherwise.
         */
        satisfies(parseNode) {
            if (super.satisfies(parseNode)) {
                let data = parseNode.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD);
                let parentData = parseNode.getParent().getData().getName();
                return parentData == "CD" && !Number.isNaN(data);
            }
            return false;
        }
    }
    exports.IsNumber = IsNumber;
});
//# sourceMappingURL=IsNumber.js.map