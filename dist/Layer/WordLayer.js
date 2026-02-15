"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordLayer = void 0;
class WordLayer {
    layerValue;
    layerName;
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
//# sourceMappingURL=WordLayer.js.map