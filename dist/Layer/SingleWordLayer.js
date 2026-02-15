"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleWordLayer = void 0;
const WordLayer_1 = require("./WordLayer");
class SingleWordLayer extends WordLayer_1.WordLayer {
    /**
     * Sets the property of the word
     * @param layerValue Layer info
     */
    setLayerValue(layerValue) {
        this.layerValue = layerValue;
    }
}
exports.SingleWordLayer = SingleWordLayer;
//# sourceMappingURL=SingleWordLayer.js.map