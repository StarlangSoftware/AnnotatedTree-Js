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