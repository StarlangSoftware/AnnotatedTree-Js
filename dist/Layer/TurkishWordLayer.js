"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurkishWordLayer = void 0;
const TargetLanguageWordLayer_1 = require("./TargetLanguageWordLayer");
class TurkishWordLayer extends TargetLanguageWordLayer_1.TargetLanguageWordLayer {
    /**
     * Constructor for the word layer for Turkish language. Sets the surface form.
     * @param layerValue Value for the word layer.
     */
    constructor(layerValue) {
        super(layerValue);
        this.layerName = "turkish";
    }
}
exports.TurkishWordLayer = TurkishWordLayer;
//# sourceMappingURL=TurkishWordLayer.js.map