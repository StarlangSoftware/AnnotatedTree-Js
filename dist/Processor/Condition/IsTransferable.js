(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsLeafNode", "./IsNoneNode", "./IsNullElement"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsTransferable = void 0;
    const IsLeafNode_1 = require("./IsLeafNode");
    const IsNoneNode_1 = require("./IsNoneNode");
    const IsNullElement_1 = require("./IsNullElement");
    class IsTransferable extends IsLeafNode_1.IsLeafNode {
        constructor(secondLanguage) {
            super();
            this.secondLanguage = secondLanguage;
        }
        satisfies(parseNode) {
            if (super.satisfies(parseNode)) {
                if (new IsNoneNode_1.IsNoneNode(this.secondLanguage).satisfies(parseNode)) {
                    return false;
                }
                return !new IsNullElement_1.IsNullElement().satisfies(parseNode);
            }
            return false;
        }
    }
    exports.IsTransferable = IsTransferable;
});
//# sourceMappingURL=IsTransferable.js.map