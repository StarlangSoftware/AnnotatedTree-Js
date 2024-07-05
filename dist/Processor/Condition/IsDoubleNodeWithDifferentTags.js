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
    exports.IsDoubleNodeWithDifferentTags = void 0;
    class IsDoubleNodeWithDifferentTags {
        /**
         * Checks if the parse node is a double node, i.e., it has one child and his child has one or more children; and its
         * tag is not equal to its child tag.
         * @param parseNode Parse node to check
         * @return True if the tag of the parse node is not equal to the tag of its child node, false otherwise.
         */
        satisfies(parseNode) {
            return parseNode.numberOfChildren() == 1
                && parseNode.getChild(0).numberOfChildren() >= 1
                && !parseNode.getChild(0).isLeaf()
                && parseNode.getData() != parseNode.getChild(0).getData();
        }
    }
    exports.IsDoubleNodeWithDifferentTags = IsDoubleNodeWithDifferentTags;
});
//# sourceMappingURL=IsDoubleNodeWithDifferentTags.js.map