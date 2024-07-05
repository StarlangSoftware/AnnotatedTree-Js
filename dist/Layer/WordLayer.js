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
        /**
         * Accessor for the layerValue attribute.
         * @return LayerValue attribute.
         */
        getLayerValue() {
            return this.layerValue;
        }
        /**
         * Accessor for the layerName attribute.
         * @return LayerName attribute.
         */
        getLayerName() {
            return this.layerName;
        }
        /**
         * Returns string form of the word layer.
         * @return String form of the word layer.
         */
        getLayerDescription() {
            return "{" + this.layerName + "=" + this.layerValue + "}";
        }
    }
    exports.WordLayer = WordLayer;
});
//# sourceMappingURL=WordLayer.js.map