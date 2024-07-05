(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsLeafNode", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "nlptoolkit-dictionary/dist/Dictionary/Word"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsPunctuationNode = void 0;
    const IsLeafNode_1 = require("./IsLeafNode");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const Word_1 = require("nlptoolkit-dictionary/dist/Dictionary/Word");
    class IsPunctuationNode extends IsLeafNode_1.IsLeafNode {
        /**
         * Checks if the node is a leaf node and contains punctuation as the data.
         * @param parseNode Parse node to check.
         * @return True if the node is a leaf node and contains punctuation as the data, false otherwise.
         */
        satisfies(parseNode) {
            if (super.satisfies(parseNode)) {
                let data = parseNode.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD);
                return Word_1.Word.isPunctuation(data) && data != "$";
            }
            return false;
        }
    }
    exports.IsPunctuationNode = IsPunctuationNode;
});
//# sourceMappingURL=IsPunctuationNode.js.map