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
    exports.IsProperNoun = void 0;
    const IsLeafNode_1 = require("./IsLeafNode");
    class IsProperNoun extends IsLeafNode_1.IsLeafNode {
        /**
         * Checks if the node is a leaf node and its parent has the tag NNP or NNPS.
         * @param parseNode Parse node to check.
         * @return True if the node is a leaf node and its parent has the tag NNP or NNPS, false otherwise.
         */
        satisfies(parseNode) {
            if (super.satisfies(parseNode)) {
                let parentData = parseNode.getParent().getData().getName();
                return parentData == "NNP" || parentData == "NNPS";
            }
            return false;
        }
    }
    exports.IsProperNoun = IsProperNoun;
});
//# sourceMappingURL=IsProperNoun.js.map