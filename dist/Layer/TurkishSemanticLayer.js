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
    exports.TurkishSemanticLayer = void 0;
    const MultiWordLayer_1 = require("./MultiWordLayer");
    class TurkishSemanticLayer extends MultiWordLayer_1.MultiWordLayer {
        constructor(layerValue) {
            super();
            this.layerName = "semantics";
            this.setLayerValue(layerValue);
        }
        setLayerValue(layerValue) {
            this.items = new Array();
            this.layerValue = layerValue;
            if (layerValue != null) {
                let splitMeanings = layerValue.split("\\$");
                for (let meaning of splitMeanings) {
                    this.items.push(meaning);
                }
            }
        }
    }
    exports.TurkishSemanticLayer = TurkishSemanticLayer;
});
//# sourceMappingURL=TurkishSemanticLayer.js.map