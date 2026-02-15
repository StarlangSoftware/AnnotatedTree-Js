"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersianWordLayer = void 0;
const TargetLanguageWordLayer_1 = require("./TargetLanguageWordLayer");
class PersianWordLayer extends TargetLanguageWordLayer_1.TargetLanguageWordLayer {
    /**
     * Constructor for the word layer for Persian language. Sets the surface form.
     * @param layerValue Value for the word layer.
     */
    constructor(layerValue) {
        super(layerValue);
        this.layerName = "persian";
    }
}
exports.PersianWordLayer = PersianWordLayer;
//# sourceMappingURL=PersianWordLayer.js.map