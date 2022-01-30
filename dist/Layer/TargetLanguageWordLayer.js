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
    exports.TargetLanguageWordLayer = void 0;
    const MultiWordLayer_1 = require("./MultiWordLayer");
    class TargetLanguageWordLayer extends MultiWordLayer_1.MultiWordLayer {
        constructor(layerValue) {
            super();
            this.setLayerValue(layerValue);
        }
        setLayerValue(layerValue) {
            this.items = new Array();
            this.layerValue = layerValue;
            if (layerValue != null) {
                let splitWords = layerValue.split("\\s");
                for (let item of splitWords) {
                    this.items.push(item);
                }
            }
        }
        getLayerSize(viewLayer) {
            return 0;
        }
        getLayerInfoAt(viewLayer, index) {
            return null;
        }
    }
    exports.TargetLanguageWordLayer = TargetLanguageWordLayer;
});
//# sourceMappingURL=TargetLanguageWordLayer.js.map