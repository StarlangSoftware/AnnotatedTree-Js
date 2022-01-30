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
        constructor(layerValue) {
            super();
            this.layerName = "morphologicalAnalysis";
            this.setLayerValue(layerValue);
        }
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