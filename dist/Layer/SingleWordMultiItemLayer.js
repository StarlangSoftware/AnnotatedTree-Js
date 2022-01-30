(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SingleWordLayer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SingleWordMultiItemLayer = void 0;
    const SingleWordLayer_1 = require("./SingleWordLayer");
    class SingleWordMultiItemLayer extends SingleWordLayer_1.SingleWordLayer {
        constructor() {
            super(...arguments);
            this.items = new Array();
        }
        getItemAt(index) {
            if (index < this.items.length) {
                return this.items[index];
            }
            else {
                return undefined;
            }
        }
        getLayerSize(viewLayer) {
            return this.items.length;
        }
    }
    exports.SingleWordMultiItemLayer = SingleWordMultiItemLayer;
});
//# sourceMappingURL=SingleWordMultiItemLayer.js.map