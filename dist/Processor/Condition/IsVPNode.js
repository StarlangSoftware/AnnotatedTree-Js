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
    exports.IsVPNode = void 0;
    class IsVPNode {
        satisfies(parseNode) {
            return parseNode.numberOfChildren() > 0 && parseNode.getData().isVP();
        }
    }
    exports.IsVPNode = IsVPNode;
});
//# sourceMappingURL=IsVPNode.js.map