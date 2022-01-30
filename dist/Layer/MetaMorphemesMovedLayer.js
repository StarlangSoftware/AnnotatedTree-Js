(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MultiWordMultiItemLayer", "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetaMorphemesMovedLayer = void 0;
    const MultiWordMultiItemLayer_1 = require("./MultiWordMultiItemLayer");
    const MetamorphicParse_1 = require("nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse");
    class MetaMorphemesMovedLayer extends MultiWordMultiItemLayer_1.MultiWordMultiItemLayer {
        constructor(layerValue) {
            super();
            this.layerName = "metaMorphemesMoved";
            this.setLayerValue(layerValue);
        }
        getLayerInfoAt(viewLayer, index) {
            let size = 0;
            for (let parse of this.items) {
                if (index < size + parse.size()) {
                    return parse.getMetaMorpheme(index - size);
                }
                size += parse.size();
            }
            return null;
        }
        getLayerSize(viewLayer) {
            let size = 0;
            for (let parse of this.items) {
                size += parse.size();
            }
            return size;
        }
        setLayerValue(layerValue) {
            this.items = new Array();
            this.layerValue = layerValue;
            if (layerValue != null) {
                let splitWords = layerValue.split("\\s");
                for (let word of splitWords) {
                    this.items.push(new MetamorphicParse_1.MetamorphicParse(word));
                }
            }
        }
    }
    exports.MetaMorphemesMovedLayer = MetaMorphemesMovedLayer;
});
//# sourceMappingURL=MetaMorphemesMovedLayer.js.map