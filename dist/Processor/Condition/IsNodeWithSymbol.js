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
    exports.IsNodeWithSymbol = void 0;
    class IsNodeWithSymbol {
        constructor(symbol) {
            this.symbol = symbol;
        }
        satisfies(parseNode) {
            if (parseNode.numberOfChildren() > 0) {
                return parseNode.getData().toString() == this.symbol;
            }
            else {
                return false;
            }
        }
    }
    exports.IsNodeWithSymbol = IsNodeWithSymbol;
});
//# sourceMappingURL=IsNodeWithSymbol.js.map