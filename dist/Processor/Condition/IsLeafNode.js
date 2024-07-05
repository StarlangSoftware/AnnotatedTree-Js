(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsLeafNode = void 0;
    class IsLeafNode {
        /**
         * Checks if the parse node is a leaf node, i.e., it has no child.
         * @param parseNode Parse node to check.
         * @return True if the parse node is a leaf node, false otherwise.
         */
        satisfies(parseNode) {
            return parseNode.numberOfChildren() == 0;
        }
    }
    exports.IsLeafNode = IsLeafNode;
});
//# sourceMappingURL=IsLeafNode.js.map