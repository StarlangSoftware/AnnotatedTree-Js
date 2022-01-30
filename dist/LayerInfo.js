(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "./Layer/TurkishWordLayer", "./Layer/PersianWordLayer", "./Layer/EnglishWordLayer", "./Layer/MorphologicalAnalysisLayer", "./Layer/MetaMorphemeLayer", "./Layer/MetaMorphemesMovedLayer", "./Layer/DependencyLayer", "./Layer/TurkishSemanticLayer", "./Layer/NERLayer", "./Layer/TurkishPropbankLayer", "./Layer/EnglishPropbankLayer", "./Layer/EnglishSemanticLayer", "./Layer/ShallowParseLayer", "./Layer/MultiWordLayer", "./Layer/SingleWordMultiItemLayer", "./Layer/MultiWordMultiItemLayer", "nlptoolkit-annotatedsentence/dist/AnnotatedWord"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LayerInfo = void 0;
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const TurkishWordLayer_1 = require("./Layer/TurkishWordLayer");
    const PersianWordLayer_1 = require("./Layer/PersianWordLayer");
    const EnglishWordLayer_1 = require("./Layer/EnglishWordLayer");
    const MorphologicalAnalysisLayer_1 = require("./Layer/MorphologicalAnalysisLayer");
    const MetaMorphemeLayer_1 = require("./Layer/MetaMorphemeLayer");
    const MetaMorphemesMovedLayer_1 = require("./Layer/MetaMorphemesMovedLayer");
    const DependencyLayer_1 = require("./Layer/DependencyLayer");
    const TurkishSemanticLayer_1 = require("./Layer/TurkishSemanticLayer");
    const NERLayer_1 = require("./Layer/NERLayer");
    const TurkishPropbankLayer_1 = require("./Layer/TurkishPropbankLayer");
    const EnglishPropbankLayer_1 = require("./Layer/EnglishPropbankLayer");
    const EnglishSemanticLayer_1 = require("./Layer/EnglishSemanticLayer");
    const ShallowParseLayer_1 = require("./Layer/ShallowParseLayer");
    const MultiWordLayer_1 = require("./Layer/MultiWordLayer");
    const SingleWordMultiItemLayer_1 = require("./Layer/SingleWordMultiItemLayer");
    const MultiWordMultiItemLayer_1 = require("./Layer/MultiWordMultiItemLayer");
    const AnnotatedWord_1 = require("nlptoolkit-annotatedsentence/dist/AnnotatedWord");
    class LayerInfo {
        constructor(info) {
            this.layers = new Map();
            let splitLayers = info.split(/[{}]/);
            for (let layer of splitLayers) {
                if (layer == "") {
                    continue;
                }
                let layerType = layer.substring(0, layer.indexOf("="));
                let layerValue = layer.substring(layer.indexOf("=") + 1);
                if (layerType == "turkish") {
                    this.layers.set(ViewLayerType_1.ViewLayerType.TURKISH_WORD, new TurkishWordLayer_1.TurkishWordLayer(layerValue));
                }
                else {
                    if (layerType == "persian") {
                        this.layers.set(ViewLayerType_1.ViewLayerType.PERSIAN_WORD, new PersianWordLayer_1.PersianWordLayer(layerValue));
                    }
                    else {
                        if (layerType == "english") {
                            this.layers.set(ViewLayerType_1.ViewLayerType.ENGLISH_WORD, new EnglishWordLayer_1.EnglishWordLayer(layerValue));
                        }
                        else {
                            if (layerType == "morphologicalAnalysis") {
                                this.layers.set(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP, new MorphologicalAnalysisLayer_1.MorphologicalAnalysisLayer(layerValue));
                                this.layers.set(ViewLayerType_1.ViewLayerType.PART_OF_SPEECH, new MorphologicalAnalysisLayer_1.MorphologicalAnalysisLayer(layerValue));
                            }
                            else {
                                if (layerType == "metaMorphemes") {
                                    this.layers.set(ViewLayerType_1.ViewLayerType.META_MORPHEME, new MetaMorphemeLayer_1.MetaMorphemeLayer(layerValue));
                                }
                                else {
                                    if (layerType == "metaMorphemesMoved") {
                                        this.layers.set(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED, new MetaMorphemesMovedLayer_1.MetaMorphemesMovedLayer(layerValue));
                                    }
                                    else {
                                        if (layerType == "dependency") {
                                            this.layers.set(ViewLayerType_1.ViewLayerType.DEPENDENCY, new DependencyLayer_1.DependencyLayer(layerValue));
                                        }
                                        else {
                                            if (layerType == "semantics") {
                                                this.layers.set(ViewLayerType_1.ViewLayerType.SEMANTICS, new TurkishSemanticLayer_1.TurkishSemanticLayer(layerValue));
                                            }
                                            else {
                                                if (layerType == "namedEntity") {
                                                    this.layers.set(ViewLayerType_1.ViewLayerType.NER, new NERLayer_1.NERLayer(layerValue));
                                                }
                                                else {
                                                    if (layerType == "propBank") {
                                                        this.layers.set(ViewLayerType_1.ViewLayerType.PROPBANK, new TurkishPropbankLayer_1.TurkishPropbankLayer(layerValue));
                                                    }
                                                    else {
                                                        if (layerType == "englishPropbank") {
                                                            this.layers.set(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK, new EnglishPropbankLayer_1.EnglishPropbankLayer(layerValue));
                                                        }
                                                        else {
                                                            if (layerType == "englishSemantics") {
                                                                this.layers.set(ViewLayerType_1.ViewLayerType.ENGLISH_SEMANTICS, new EnglishSemanticLayer_1.EnglishSemanticLayer(layerValue));
                                                            }
                                                            else {
                                                                if (layerType == "shallowParse") {
                                                                    this.layers.set(ViewLayerType_1.ViewLayerType.SHALLOW_PARSE, new ShallowParseLayer_1.ShallowParseLayer(layerValue));
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        setLayerData(viewLayer, layerValue) {
            switch (viewLayer) {
                case ViewLayerType_1.ViewLayerType.PERSIAN_WORD:
                    this.layers.set(ViewLayerType_1.ViewLayerType.PERSIAN_WORD, new PersianWordLayer_1.PersianWordLayer(layerValue));
                    this.layers.delete(ViewLayerType_1.ViewLayerType.SEMANTICS);
                    break;
                case ViewLayerType_1.ViewLayerType.TURKISH_WORD:
                    this.layers.set(ViewLayerType_1.ViewLayerType.TURKISH_WORD, new TurkishWordLayer_1.TurkishWordLayer(layerValue));
                    this.layers.delete(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP);
                    this.layers.delete(ViewLayerType_1.ViewLayerType.PART_OF_SPEECH);
                    this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME);
                    this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED);
                    this.layers.delete(ViewLayerType_1.ViewLayerType.SEMANTICS);
                    break;
                case ViewLayerType_1.ViewLayerType.ENGLISH_WORD:
                    this.layers.set(ViewLayerType_1.ViewLayerType.ENGLISH_WORD, new EnglishWordLayer_1.EnglishWordLayer(layerValue));
                    break;
                case ViewLayerType_1.ViewLayerType.PART_OF_SPEECH:
                case ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP:
                    this.layers.set(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP, new MorphologicalAnalysisLayer_1.MorphologicalAnalysisLayer(layerValue));
                    this.layers.set(ViewLayerType_1.ViewLayerType.PART_OF_SPEECH, new MorphologicalAnalysisLayer_1.MorphologicalAnalysisLayer(layerValue));
                    this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED);
                    break;
                case ViewLayerType_1.ViewLayerType.META_MORPHEME:
                    this.layers.set(ViewLayerType_1.ViewLayerType.META_MORPHEME, new MetaMorphemeLayer_1.MetaMorphemeLayer(layerValue));
                    break;
                case ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED:
                    this.layers.set(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED, new MetaMorphemesMovedLayer_1.MetaMorphemesMovedLayer(layerValue));
                    break;
                case ViewLayerType_1.ViewLayerType.DEPENDENCY:
                    this.layers.set(ViewLayerType_1.ViewLayerType.DEPENDENCY, new DependencyLayer_1.DependencyLayer(layerValue));
                    break;
                case ViewLayerType_1.ViewLayerType.SEMANTICS:
                    this.layers.set(ViewLayerType_1.ViewLayerType.SEMANTICS, new TurkishSemanticLayer_1.TurkishSemanticLayer(layerValue));
                    break;
                case ViewLayerType_1.ViewLayerType.ENGLISH_SEMANTICS:
                    this.layers.set(ViewLayerType_1.ViewLayerType.ENGLISH_SEMANTICS, new EnglishSemanticLayer_1.EnglishSemanticLayer(layerValue));
                    break;
                case ViewLayerType_1.ViewLayerType.NER:
                    this.layers.set(ViewLayerType_1.ViewLayerType.NER, new NERLayer_1.NERLayer(layerValue));
                    break;
                case ViewLayerType_1.ViewLayerType.PROPBANK:
                    this.layers.set(ViewLayerType_1.ViewLayerType.PROPBANK, new TurkishPropbankLayer_1.TurkishPropbankLayer(layerValue));
                    break;
                case ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK:
                    this.layers.set(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK, new EnglishPropbankLayer_1.EnglishPropbankLayer(layerValue));
                    break;
                case ViewLayerType_1.ViewLayerType.SHALLOW_PARSE:
                    this.layers.set(ViewLayerType_1.ViewLayerType.SHALLOW_PARSE, new ShallowParseLayer_1.ShallowParseLayer(layerValue));
                    break;
            }
        }
        setMorphologicalAnalysis(parse) {
            this.layers.set(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP, new MorphologicalAnalysisLayer_1.MorphologicalAnalysisLayer(parse.toString()));
            this.layers.set(ViewLayerType_1.ViewLayerType.PART_OF_SPEECH, new MorphologicalAnalysisLayer_1.MorphologicalAnalysisLayer(parse.toString()));
        }
        setMetaMorphemes(parse) {
            this.layers.set(ViewLayerType_1.ViewLayerType.META_MORPHEME, new MetaMorphemeLayer_1.MetaMorphemeLayer(parse.toString()));
        }
        layerExists(viewLayerType) {
            return this.layers.has(viewLayerType);
        }
        checkLayer(viewLayer) {
            switch (viewLayer) {
                case ViewLayerType_1.ViewLayerType.TURKISH_WORD:
                case ViewLayerType_1.ViewLayerType.PERSIAN_WORD:
                case ViewLayerType_1.ViewLayerType.ENGLISH_SEMANTICS:
                    if (!this.layers.has(viewLayer)) {
                        return ViewLayerType_1.ViewLayerType.ENGLISH_WORD;
                    }
                case ViewLayerType_1.ViewLayerType.PART_OF_SPEECH:
                case ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP:
                case ViewLayerType_1.ViewLayerType.META_MORPHEME:
                case ViewLayerType_1.ViewLayerType.SEMANTICS:
                case ViewLayerType_1.ViewLayerType.NER:
                case ViewLayerType_1.ViewLayerType.PROPBANK:
                case ViewLayerType_1.ViewLayerType.SHALLOW_PARSE:
                case ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK:
                    if (!this.layers.has(viewLayer))
                        return this.checkLayer(ViewLayerType_1.ViewLayerType.TURKISH_WORD);
                    break;
                case ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED:
                    if (!this.layers.has(viewLayer))
                        return this.checkLayer(ViewLayerType_1.ViewLayerType.META_MORPHEME);
                    break;
            }
            return viewLayer;
        }
        getNumberOfWords() {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.TURKISH_WORD)) {
                return this.layers.get(ViewLayerType_1.ViewLayerType.TURKISH_WORD).size();
            }
            else {
                if (this.layers.has(ViewLayerType_1.ViewLayerType.PERSIAN_WORD)) {
                    return this.layers.get(ViewLayerType_1.ViewLayerType.PERSIAN_WORD).size();
                }
            }
        }
        getMultiWordAt(viewLayerType, index, layerName) {
            if (this.layers.has(viewLayerType)) {
                if (this.layers.get(viewLayerType) instanceof MultiWordLayer_1.MultiWordLayer) {
                    let multiWordLayer = this.layers.get(viewLayerType);
                    if (index < multiWordLayer.size() && index >= 0) {
                        return multiWordLayer.getItemAt(index);
                    }
                    else {
                        if (viewLayerType == ViewLayerType_1.ViewLayerType.SEMANTICS) {
                            return multiWordLayer.getItemAt(multiWordLayer.size() - 1);
                        }
                    }
                }
            }
        }
        getTurkishWordAt(index) {
            return this.getMultiWordAt(ViewLayerType_1.ViewLayerType.TURKISH_WORD, index, "turkish");
        }
        getNumberOfMeanings() {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.SEMANTICS)) {
                return this.layers.get(ViewLayerType_1.ViewLayerType.SEMANTICS).size();
            }
            else {
                return 0;
            }
        }
        getSemanticAt(index) {
            return this.getMultiWordAt(ViewLayerType_1.ViewLayerType.SEMANTICS, index, "semantics");
        }
        getShallowParseAt(index) {
            return this.getMultiWordAt(ViewLayerType_1.ViewLayerType.SHALLOW_PARSE, index, "shallowParse");
        }
        getArgument() {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.PROPBANK)) {
                if (this.layers.get(ViewLayerType_1.ViewLayerType.PROPBANK) instanceof TurkishPropbankLayer_1.TurkishPropbankLayer) {
                    let argumentLayer = this.layers.get(ViewLayerType_1.ViewLayerType.PROPBANK);
                    return argumentLayer.getArgument();
                }
                else {
                    return null;
                }
            }
            else {
                return null;
            }
        }
        getArgumentAt(index) {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK)) {
                if (this.layers.get(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK) instanceof SingleWordMultiItemLayer_1.SingleWordMultiItemLayer) {
                    let multiArgumentLayer = this.layers.get(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK);
                    return multiArgumentLayer.getItemAt(index);
                }
            }
        }
        getMorphologicalParseAt(index) {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP)) {
                if (this.layers.get(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP) instanceof MultiWordLayer_1.MultiWordLayer) {
                    let multiWordLayer = this.layers.get(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP);
                    if (index < multiWordLayer.size() && index >= 0) {
                        return multiWordLayer.getItemAt(index);
                    }
                }
            }
        }
        getMetamorphicParseAt(index) {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.META_MORPHEME)) {
                if (this.layers.get(ViewLayerType_1.ViewLayerType.META_MORPHEME) instanceof MultiWordLayer_1.MultiWordLayer) {
                    let multiWordLayer = this.layers.get(ViewLayerType_1.ViewLayerType.META_MORPHEME);
                    if (index < multiWordLayer.size() && index >= 0) {
                        return multiWordLayer.getItemAt(index);
                    }
                }
            }
        }
        getMetaMorphemeAtIndex(index) {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.META_MORPHEME)) {
                if (this.layers.get(ViewLayerType_1.ViewLayerType.META_MORPHEME) instanceof MetaMorphemeLayer_1.MetaMorphemeLayer) {
                    let metaMorphemeLayer = this.layers.get(ViewLayerType_1.ViewLayerType.META_MORPHEME);
                    if (index < metaMorphemeLayer.getLayerSize(ViewLayerType_1.ViewLayerType.META_MORPHEME) && index >= 0) {
                        return metaMorphemeLayer.getLayerInfoAt(ViewLayerType_1.ViewLayerType.META_MORPHEME, index);
                    }
                }
            }
        }
        getMetaMorphemeFromIndex(index) {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.META_MORPHEME)) {
                if (this.layers.get(ViewLayerType_1.ViewLayerType.META_MORPHEME) instanceof MetaMorphemeLayer_1.MetaMorphemeLayer) {
                    let metaMorphemeLayer = this.layers.get(ViewLayerType_1.ViewLayerType.META_MORPHEME);
                    if (index < metaMorphemeLayer.getLayerSize(ViewLayerType_1.ViewLayerType.META_MORPHEME) && index >= 0) {
                        return metaMorphemeLayer.getLayerInfoFrom(index);
                    }
                }
            }
        }
        getLayerSize(viewLayer) {
            if (this.layers.get(viewLayer) instanceof MultiWordMultiItemLayer_1.MultiWordMultiItemLayer) {
                return this.layers.get(viewLayer).getLayerSize(viewLayer);
            }
            else {
                if (this.layers.get(viewLayer) instanceof SingleWordMultiItemLayer_1.SingleWordMultiItemLayer) {
                    return this.layers.get(viewLayer).getLayerSize(viewLayer);
                }
            }
            return 0;
        }
        getLayerInfoAt(viewLayer, index) {
            switch (viewLayer) {
                case ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED:
                case ViewLayerType_1.ViewLayerType.PART_OF_SPEECH:
                case ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP:
                    if (this.layers.get(viewLayer) instanceof MultiWordMultiItemLayer_1.MultiWordMultiItemLayer) {
                        return this.layers.get(viewLayer).getLayerInfoAt(viewLayer, index);
                    }
                    break;
                case ViewLayerType_1.ViewLayerType.META_MORPHEME:
                    return this.getMetaMorphemeAtIndex(index);
                case ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK:
                    return this.getArgumentAt(index).getArgumentType();
                default:
                    return null;
            }
        }
        getLayerDescription() {
            let result = "";
            for (let viewLayerType of this.layers.keys()) {
                if (viewLayerType != ViewLayerType_1.ViewLayerType.PART_OF_SPEECH) {
                    result = result + this.layers.get(viewLayerType).getLayerDescription();
                }
            }
            return result;
        }
        getLayerData(viewLayer) {
            if (this.layers.has(viewLayer)) {
                return this.layers.get(viewLayer).getLayerValue();
            }
            else {
                return null;
            }
        }
        getRobustLayerData(viewLayer) {
            viewLayer = this.checkLayer(viewLayer);
            return this.getLayerData(viewLayer);
        }
        updateMetaMorphemesMoved() {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.META_MORPHEME)) {
                let metaMorphemeLayer = this.layers.get(ViewLayerType_1.ViewLayerType.META_MORPHEME);
                if (metaMorphemeLayer.size() > 0) {
                    let result = metaMorphemeLayer.getItemAt(0).toString();
                    for (let i = 1; i < metaMorphemeLayer.size(); i++) {
                        result = result + " " + metaMorphemeLayer.getItemAt(i).toString();
                    }
                    this.layers.set(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED, new MetaMorphemesMovedLayer_1.MetaMorphemesMovedLayer(result));
                }
            }
        }
        removeLayer(layerType) {
            this.layers.delete(layerType);
        }
        metaMorphemeClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME);
            this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED);
        }
        englishClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.ENGLISH_WORD);
        }
        dependencyClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.DEPENDENCY);
        }
        metaMorphemesMovedClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED);
        }
        semanticClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.SEMANTICS);
        }
        englishSemanticClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.ENGLISH_SEMANTICS);
        }
        morphologicalAnalysisClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP);
            this.layers.delete(ViewLayerType_1.ViewLayerType.PART_OF_SPEECH);
            this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME);
            this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED);
        }
        metaMorphemeRemove(index) {
            let removedParse;
            if (this.layers.has(ViewLayerType_1.ViewLayerType.META_MORPHEME)) {
                let metaMorphemeLayer = this.layers.get(ViewLayerType_1.ViewLayerType.META_MORPHEME);
                if (index >= 0 && index < metaMorphemeLayer.getLayerSize(ViewLayerType_1.ViewLayerType.META_MORPHEME)) {
                    removedParse = metaMorphemeLayer.metaMorphemeRemoveFromIndex(index);
                    this.updateMetaMorphemesMoved();
                }
            }
            return removedParse;
        }
        isVerbal() {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP)) {
                return this.layers.get(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP).isVerbal();
            }
            else {
                return false;
            }
        }
        isNominal() {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP)) {
                return this.layers.get(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP).isNominal();
            }
            else {
                return false;
            }
        }
        divideIntoWords() {
            let result = new Array();
            for (let i = 0; i < this.getNumberOfWords(); i++) {
                let layerInfo = new LayerInfo();
                layerInfo.setLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD, this.getTurkishWordAt(i));
                layerInfo.setLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD, this.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD));
                if (this.layerExists(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP)) {
                    layerInfo.setMorphologicalAnalysis(this.getMorphologicalParseAt(i));
                }
                if (this.layerExists(ViewLayerType_1.ViewLayerType.META_MORPHEME)) {
                    layerInfo.setMetaMorphemes(this.getMetamorphicParseAt(i));
                }
                if (this.layerExists(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK)) {
                    layerInfo.setLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK, this.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK));
                }
                if (this.layerExists(ViewLayerType_1.ViewLayerType.ENGLISH_SEMANTICS)) {
                    layerInfo.setLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_SEMANTICS, this.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_SEMANTICS));
                }
                if (this.layerExists(ViewLayerType_1.ViewLayerType.NER)) {
                    layerInfo.setLayerData(ViewLayerType_1.ViewLayerType.NER, this.getLayerData(ViewLayerType_1.ViewLayerType.NER));
                }
                if (this.layerExists(ViewLayerType_1.ViewLayerType.SEMANTICS)) {
                    layerInfo.setLayerData(ViewLayerType_1.ViewLayerType.SEMANTICS, this.getSemanticAt(i));
                }
                if (this.layerExists(ViewLayerType_1.ViewLayerType.PROPBANK)) {
                    layerInfo.setLayerData(ViewLayerType_1.ViewLayerType.PROPBANK, this.getArgument().toString());
                }
                if (this.layerExists(ViewLayerType_1.ViewLayerType.SHALLOW_PARSE)) {
                    layerInfo.setLayerData(ViewLayerType_1.ViewLayerType.SHALLOW_PARSE, this.getShallowParseAt(i));
                }
                result.push(layerInfo);
            }
            return result;
        }
        toAnnotatedWord(wordIndex) {
            let annotatedWord = new AnnotatedWord_1.AnnotatedWord(this.getTurkishWordAt(wordIndex));
            if (this.layerExists(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP)) {
                annotatedWord.setParse(this.getMorphologicalParseAt(wordIndex).toString());
            }
            if (this.layerExists(ViewLayerType_1.ViewLayerType.META_MORPHEME)) {
                annotatedWord.setMetamorphicParse(this.getMetamorphicParseAt(wordIndex).toString());
            }
            if (this.layerExists(ViewLayerType_1.ViewLayerType.SEMANTICS)) {
                annotatedWord.setSemantic(this.getSemanticAt(wordIndex));
            }
            if (this.layerExists(ViewLayerType_1.ViewLayerType.NER)) {
                annotatedWord.setNamedEntityType(this.getLayerData(ViewLayerType_1.ViewLayerType.NER));
            }
            if (this.layerExists(ViewLayerType_1.ViewLayerType.PROPBANK)) {
                annotatedWord.setArgument(this.getArgument().toString());
            }
            if (this.layerExists(ViewLayerType_1.ViewLayerType.SHALLOW_PARSE)) {
                annotatedWord.setShallowParse(this.getShallowParseAt(wordIndex));
            }
            return annotatedWord;
        }
    }
    exports.LayerInfo = LayerInfo;
});
//# sourceMappingURL=LayerInfo.js.map