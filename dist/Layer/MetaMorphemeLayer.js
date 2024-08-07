(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MetaMorphemesMovedLayer", "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MetaMorphemeLayer = void 0;
    const MetaMorphemesMovedLayer_1 = require("./MetaMorphemesMovedLayer");
    const MetamorphicParse_1 = require("nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    class MetaMorphemeLayer extends MetaMorphemesMovedLayer_1.MetaMorphemesMovedLayer {
        /**
         * Constructor for the metamorpheme layer. Sets the metamorpheme information for multiple words in the node.
         * @param layerValue Layer value for the metamorpheme information. Consists of metamorpheme information of multiple
         *                   words separated via space character.
         */
        constructor(layerValue) {
            super(layerValue);
            this.layerName = "metaMorphemes";
        }
        /**
         * Sets the layer value to the string form of the given parse.
         * @param parse New metamorphic parse.
         */
        setLayerValue(parse) {
            this.layerValue = parse.toString();
            this.items = new Array();
            if (this.layerValue != null) {
                let splitWords = this.layerValue.split("\\s");
                for (let word of splitWords) {
                    this.items.push(new MetamorphicParse_1.MetamorphicParse(word));
                }
            }
        }
        /**
         * Constructs metamorpheme information starting from the position index.
         * @param index Position of the morpheme to start.
         * @return Metamorpheme information starting from the position index.
         */
        getLayerInfoFrom(index) {
            let size = 0;
            for (let parse of this.items) {
                if (index < size + parse.size()) {
                    let result = parse.getMetaMorpheme(index - size);
                    index++;
                    while (index < size + parse.size()) {
                        result = result + "+" + parse.getMetaMorpheme(index - size);
                        index++;
                    }
                    return result;
                }
                size += parse.size();
            }
            return null;
        }
        /**
         * Removes metamorphemes from the given index. Index shows the position of the metamorpheme in the metamorphemes list.
         * @param index Position of the metamorpheme from which the other metamorphemes will be removed.
         * @return New metamorphic parse not containing the removed parts.
         */
        metaMorphemeRemoveFromIndex(index) {
            if (index >= 0 && index < this.getLayerSize(ViewLayerType_1.ViewLayerType.META_MORPHEME)) {
                let size = 0;
                for (let parse of this.items) {
                    if (index < size + parse.size()) {
                        parse.removeMetaMorphemeFromIndex(index - size);
                        return parse;
                    }
                    size += parse.size();
                }
            }
            return null;
        }
    }
    exports.MetaMorphemeLayer = MetaMorphemeLayer;
});
//# sourceMappingURL=MetaMorphemeLayer.js.map