(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MultiWordMultiItemLayer", "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalParse", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MorphologicalAnalysisLayer = void 0;
    const MultiWordMultiItemLayer_1 = require("./MultiWordMultiItemLayer");
    const MorphologicalParse_1 = require("nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalParse");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    class MorphologicalAnalysisLayer extends MultiWordMultiItemLayer_1.MultiWordMultiItemLayer {
        /**
         * Constructor for the morphological analysis layer. Sets the morphological parse information for multiple words in
         * the node.
         * @param layerValue Layer value for the morphological parse information. Consists of morphological parse information
         *                   of multiple words separated via space character.
         */
        constructor(layerValue) {
            super();
            this.layerName = "morphologicalAnalysis";
            this.setLayerValue(layerValue);
        }
        /**
         * Returns the morphological tag (for PART_OF_SPEECH) or inflectional group (for INFLECTIONAL_GROUP) at position
         * index.
         * @param viewLayer Layer type.
         * @param index Position of the morphological tag (for PART_OF_SPEECH) or inflectional group (for INFLECTIONAL_GROUP)
         * @return The morphological tag (for PART_OF_SPEECH) or inflectional group (for INFLECTIONAL_GROUP)
         */
        getLayerInfoAt(viewLayer, index) {
            let size;
            switch (viewLayer) {
                case ViewLayerType_1.ViewLayerType.PART_OF_SPEECH:
                    size = 0;
                    for (let parse of this.items) {
                        if (index < size + parse.tagSize()) {
                            return parse.getTag(index - size);
                        }
                        size += parse.tagSize();
                    }
                    return null;
                case ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP:
                    size = 0;
                    for (let parse of this.items) {
                        if (index < size + parse.size()) {
                            return parse.getInflectionalGroupString(index - size);
                        }
                        size += parse.size();
                    }
                    return null;
            }
            return null;
        }
        /**
         * Returns the total number of morphological tags (for PART_OF_SPEECH) or inflectional groups
         * (for INFLECTIONAL_GROUP) in the words in the node.
         * @param viewLayer Layer type.
         * @return Total number of morphological tags (for PART_OF_SPEECH) or inflectional groups (for INFLECTIONAL_GROUP)
         * in the words in the node.
         */
        getLayerSize(viewLayer) {
            let size;
            switch (viewLayer) {
                case ViewLayerType_1.ViewLayerType.PART_OF_SPEECH:
                    size = 0;
                    for (let parse of this.items) {
                        size += parse.tagSize();
                    }
                    return size;
                case ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP:
                    size = 0;
                    for (let parse of this.items) {
                        size += parse.size();
                    }
                    return size;
                default:
                    return 0;
            }
        }
        /**
         * Sets the layer value to the string form of the given morphological parse.
         * @param layerValue New morphological parse.
         */
        setLayerValue(layerValue) {
            if (layerValue instanceof MorphologicalParse_1.MorphologicalParse) {
                let parse = layerValue;
                this.layerValue = parse.getMorphologicalParseTransitionList();
                this.items = new Array();
                this.items.push(parse);
            }
            else {
                this.items = new Array();
                this.layerValue = layerValue;
                if (layerValue != null) {
                    let splitWords = layerValue.split("\\s");
                    for (let word of splitWords) {
                        this.items.push(new MorphologicalParse_1.MorphologicalParse(word));
                    }
                }
            }
        }
        /**
         * Checks if the last inflectional group contains VERB tag.
         * @return True if the last inflectional group contains VERB tag, false otherwise.
         */
        isVerbal() {
            let dbLabel = "^DB+";
            let needle = "VERB+";
            let haystack;
            if (this.layerValue.includes(dbLabel)) {
                haystack = this.layerValue.substring(this.layerValue.lastIndexOf(dbLabel) + 4);
            }
            else {
                haystack = this.layerValue;
            }
            return haystack.includes(needle);
        }
        /**
         * Checks if the last verbal inflectional group contains ZERO tag.
         * @return True if the last verbal inflectional group contains ZERO tag, false otherwise.
         */
        isNominal() {
            let dbLabel = "^DB+VERB+";
            let needle = "ZERO+";
            let haystack;
            if (this.layerValue.includes(dbLabel)) {
                haystack = this.layerValue.substring(this.layerValue.lastIndexOf(dbLabel) + 9);
            }
            else {
                haystack = this.layerValue;
            }
            return haystack.includes(needle);
        }
    }
    exports.MorphologicalAnalysisLayer = MorphologicalAnalysisLayer;
});
//# sourceMappingURL=MorphologicalAnalysisLayer.js.map