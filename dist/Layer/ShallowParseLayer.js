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
    exports.ShallowParseLayer = void 0;
    const MultiWordLayer_1 = require("./MultiWordLayer");
    class ShallowParseLayer extends MultiWordLayer_1.MultiWordLayer {
        constructor(layerValue) {
            super();
            this.layerName = "shallowParse";
            this.setLayerValue(layerValue);
        }
        setLayerValue(layerValue) {
            this.items = new Array();
            this.layerValue = layerValue;
            if (layerValue != null) {
                let splitParse = layerValue.split(" ");
                for (let item of splitParse) {
                    this.items.push(item);
                }
            }
        }
    }
    exports.ShallowParseLayer = ShallowParseLayer;
});
//# sourceMappingURL=ShallowParseLayer.js.map