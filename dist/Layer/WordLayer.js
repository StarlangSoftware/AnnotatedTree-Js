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
    exports.WordLayer = void 0;
    class WordLayer {
        getLayerValue() {
            return this.layerValue;
        }
        getLayerName() {
            return this.layerName;
        }
        getLayerDescription() {
            return "{" + this.layerName + "=" + this.layerValue + "}";
        }
    }
    exports.WordLayer = WordLayer;
});
//# sourceMappingURL=WordLayer.js.map