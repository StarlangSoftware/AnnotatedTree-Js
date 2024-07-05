(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsLeafNode", "./IsNullElement"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsEnglishLeafNode = void 0;
    const IsLeafNode_1 = require("./IsLeafNode");
    const IsNullElement_1 = require("./IsNullElement");
    class IsEnglishLeafNode extends IsLeafNode_1.IsLeafNode {
        /**
         * Checks if the parse node is a leaf node and contains a valid English word in its data.
         * @param parseNode Parse node to check.
         * @return True if the parse node is a leaf node and contains a valid English word in its data; false otherwise.
         */
        satisfies(parseNode) {
            if (super.satisfies(parseNode)) {
                return !new IsNullElement_1.IsNullElement().satisfies(parseNode);
            }
            return false;
        }
    }
    exports.IsEnglishLeafNode = IsEnglishLeafNode;
});
//# sourceMappingURL=IsEnglishLeafNode.js.map