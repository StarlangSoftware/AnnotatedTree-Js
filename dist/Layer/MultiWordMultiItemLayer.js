(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MultiWordLayer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiWordMultiItemLayer = void 0;
    const MultiWordLayer_1 = require("./MultiWordLayer");
    class MultiWordMultiItemLayer extends MultiWordLayer_1.MultiWordLayer {
    }
    exports.MultiWordMultiItemLayer = MultiWordMultiItemLayer;
});
//# sourceMappingURL=MultiWordMultiItemLayer.js.map