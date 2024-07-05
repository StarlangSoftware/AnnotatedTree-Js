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
        /**
         * Constructor for the metaMorphemesMoved layer. Sets the metamorpheme information for multiple words in the node.
         * @param layerValue Layer value for the metaMorphemesMoved information. Consists of metamorpheme information of
         *                   multiple words separated via space character.
         */
        constructor(layerValue) {
            super();
            this.layerName = "metaMorphemesMoved";
            this.setLayerValue(layerValue);
        }
        /**
         * Returns the metamorpheme at position index in the metamorpheme list.
         * @param viewLayer Not used.
         * @param index Position in the metamorpheme list.
         * @return The metamorpheme at position index in the metamorpheme list.
         */
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
        /**
         * Returns the total number of metamorphemes in the words in the node.
         * @param viewLayer Not used.
         * @return Total number of metamorphemes in the words in the node.
         */
        getLayerSize(viewLayer) {
            let size = 0;
            for (let parse of this.items) {
                size += parse.size();
            }
            return size;
        }
        /**
         * Sets the layer value to the string form of the given parse.
         * @param layerValue New metamorphic parse.
         */
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