(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SingleWordMultiItemLayer", "nlptoolkit-propbank/dist/Argument"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnglishPropbankLayer = void 0;
    const SingleWordMultiItemLayer_1 = require("./SingleWordMultiItemLayer");
    const Argument_1 = require("nlptoolkit-propbank/dist/Argument");
    class EnglishPropbankLayer extends SingleWordMultiItemLayer_1.SingleWordMultiItemLayer {
        constructor(layerValue) {
            super();
            this.layerName = "englishPropbank";
            this.setLayerValue(layerValue);
        }
        setLayerValue(layerValue) {
            this.items = new Array();
            this.layerValue = layerValue;
            if (layerValue != null) {
                let splitWords = layerValue.split("#");
                for (let word of splitWords) {
                    this.items.push(new Argument_1.Argument(word));
                }
            }
        }
    }
    exports.EnglishPropbankLayer = EnglishPropbankLayer;
});
//# sourceMappingURL=EnglishPropbankLayer.js.map