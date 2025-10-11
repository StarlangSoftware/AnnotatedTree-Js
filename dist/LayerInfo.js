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
        /**
         * Constructs the layer information from the given string. Layers are represented as
         * {layername1=layervalue1}{layername2=layervalue2}...{layernamek=layervaluek} where layer name is one of the
         * following: turkish, persian, english, morphologicalAnalysis, metaMorphemes, metaMorphemesMoved, dependency,
         * semantics, namedEntity, propBank, englishPropbank, englishSemantics, shallowParse. Splits the string w.r.t.
         * parentheses and constructs layer objects and put them layers map accordingly.
         * @param info Line consisting of layer info.
         */
        constructor(info) {
            this.layers = new Map();
            let splitLayers = info.split(/[{}]/);
            for (let layer of splitLayers) {
                if (layer == "") {
                    continue;
                }
                let layerType = layer.substring(0, layer.indexOf("="));
                let layerValue = layer.substring(layer.indexOf("=") + 1);
                switch (layerType) {
                    case "turkish":
                        this.layers.set(ViewLayerType_1.ViewLayerType.TURKISH_WORD, new TurkishWordLayer_1.TurkishWordLayer(layerValue));
                        break;
                    case "persian":
                        this.layers.set(ViewLayerType_1.ViewLayerType.PERSIAN_WORD, new PersianWordLayer_1.PersianWordLayer(layerValue));
                        break;
                    case "english":
                        this.layers.set(ViewLayerType_1.ViewLayerType.ENGLISH_WORD, new EnglishWordLayer_1.EnglishWordLayer(layerValue));
                        break;
                    case "morphologicalAnalysis":
                        this.layers.set(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP, new MorphologicalAnalysisLayer_1.MorphologicalAnalysisLayer(layerValue));
                        this.layers.set(ViewLayerType_1.ViewLayerType.PART_OF_SPEECH, new MorphologicalAnalysisLayer_1.MorphologicalAnalysisLayer(layerValue));
                        break;
                    case "metaMorphemes":
                        this.layers.set(ViewLayerType_1.ViewLayerType.META_MORPHEME, new MetaMorphemeLayer_1.MetaMorphemeLayer(layerValue));
                        break;
                    case "metaMorphemesMoved":
                        this.layers.set(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED, new MetaMorphemesMovedLayer_1.MetaMorphemesMovedLayer(layerValue));
                        break;
                    case "dependency":
                        this.layers.set(ViewLayerType_1.ViewLayerType.DEPENDENCY, new DependencyLayer_1.DependencyLayer(layerValue));
                        break;
                    case "semantics":
                        this.layers.set(ViewLayerType_1.ViewLayerType.SEMANTICS, new TurkishSemanticLayer_1.TurkishSemanticLayer(layerValue));
                        break;
                    case "namedEntity":
                        this.layers.set(ViewLayerType_1.ViewLayerType.NER, new NERLayer_1.NERLayer(layerValue));
                        break;
                    case "propBank":
                        this.layers.set(ViewLayerType_1.ViewLayerType.PROPBANK, new TurkishPropbankLayer_1.TurkishPropbankLayer(layerValue));
                        break;
                    case "englishPropbank":
                        this.layers.set(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK, new EnglishPropbankLayer_1.EnglishPropbankLayer(layerValue));
                        break;
                    case "englishSemantics":
                        this.layers.set(ViewLayerType_1.ViewLayerType.ENGLISH_SEMANTICS, new EnglishSemanticLayer_1.EnglishSemanticLayer(layerValue));
                        break;
                    case "shallowParse":
                        this.layers.set(ViewLayerType_1.ViewLayerType.SHALLOW_PARSE, new ShallowParseLayer_1.ShallowParseLayer(layerValue));
                        break;
                }
            }
        }
        /**
         * Changes the given layer info with the given string layer value. For all layers new layer object is created and
         * replaces the original object. For turkish layer, it also destroys inflectional_group, part_of_speech,
         * meta_morpheme, meta_morpheme_moved and semantics layers. For persian layer, it also destroys the semantics layer.
         * @param viewLayer Layer name.
         * @param layerValue New layer value.
         */
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
        /**
         * Updates the inflectional_group and part_of_speech layers according to the given parse.
         * @param parse New parse to update layers.
         */
        setMorphologicalAnalysis(parse) {
            this.layers.set(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP, new MorphologicalAnalysisLayer_1.MorphologicalAnalysisLayer(parse.toString()));
            this.layers.set(ViewLayerType_1.ViewLayerType.PART_OF_SPEECH, new MorphologicalAnalysisLayer_1.MorphologicalAnalysisLayer(parse.toString()));
        }
        /**
         * Updates the metamorpheme layer according to the given parse.
         * @param parse NEw parse to update layer.
         */
        setMetaMorphemes(parse) {
            this.layers.set(ViewLayerType_1.ViewLayerType.META_MORPHEME, new MetaMorphemeLayer_1.MetaMorphemeLayer(parse.toString()));
        }
        /**
         * Checks if the given layer exists.
         * @param viewLayerType Layer name
         * @return True if the layer exists, false otherwise.
         */
        layerExists(viewLayerType) {
            return this.layers.has(viewLayerType);
        }
        /**
         * Two level layer check method. For turkish, persian and english_semantics layers, if the layer does not exist,
         * returns english layer. For part_of_speech, inflectional_group, meta_morpheme, semantics, propbank, shallow_parse,
         * english_propbank layers, if the layer does not exist, it checks turkish layer. For meta_morpheme_moved, if the
         * layer does not exist, it checks meta_morpheme layer.
         * @param viewLayer Layer to be checked.
         * @return Returns the original layer if the layer exists. For turkish, persian and english_semantics layers, if the
         * layer  does not exist, returns english layer. For part_of_speech, inflectional_group, meta_morpheme, semantics,
         * propbank,  shallow_parse, english_propbank layers, if the layer does not exist, it checks turkish layer
         * recursively. For meta_morpheme_moved, if the layer does not exist, it checks meta_morpheme layer recursively.
         */
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
        /**
         * Returns number of words in the Turkish or Persian layer, whichever exists.
         * @return Number of words in the Turkish or Persian layer, whichever exists.
         */
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
        /**
         * Returns the layer value at the given index.
         * @param viewLayerType Layer for which the value at the given word index will be returned.
         * @param index Word Position of the layer value.
         * @param layerName Name of the layer.
         * @return Layer info at word position index for a multiword layer.
         */
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
        /**
         * Layers may contain multiple Turkish words. This method returns the Turkish word at position index.
         * @param index Position of the Turkish word.
         * @return The Turkish word at position index.
         */
        getTurkishWordAt(index) {
            return this.getMultiWordAt(ViewLayerType_1.ViewLayerType.TURKISH_WORD, index, "turkish");
        }
        /**
         * Returns number of meanings in the Turkish layer.
         * @return Number of meanings in the Turkish layer.
         */
        getNumberOfMeanings() {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.SEMANTICS)) {
                return this.layers.get(ViewLayerType_1.ViewLayerType.SEMANTICS).size();
            }
            else {
                return 0;
            }
        }
        /**
         * Layers may contain multiple semantic information corresponding to multiple Turkish words. This method returns
         * the sense id at position index.
         * @param index Position of the Turkish word.
         * @throws LayerNotExistsException If the layer does not exist, it throws LayerNotExistsException.
         * @throws WordNotExistsException If the index is out of bounds, it throws WordNotExistsException.
         * @return The Turkish sense id at position index.
         */
        getSemanticAt(index) {
            return this.getMultiWordAt(ViewLayerType_1.ViewLayerType.SEMANTICS, index, "semantics");
        }
        /**
         * Layers may contain multiple shallow parse information corresponding to multiple Turkish words. This method
         * returns the shallow parse tag at position index.
         * @param index Position of the Turkish word.
         * @throws LayerNotExistsException If the layer does not exist, it throws LayerNotExistsException.
         * @throws WordNotExistsException If the index is out of bounds, it throws WordNotExistsException.
         * @return The shallow parse tag at position index.
         */
        getShallowParseAt(index) {
            return this.getMultiWordAt(ViewLayerType_1.ViewLayerType.SHALLOW_PARSE, index, "shallowParse");
        }
        /**
         * Returns the Turkish PropBank argument info.
         * @return Turkish PropBank argument info.
         */
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
        /**
         * A word may have multiple English propbank info. This method returns the English PropBank argument info at
         * position index.
         * @return English PropBank argument info at position index.
         */
        getArgumentAt(index) {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK)) {
                if (this.layers.get(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK) instanceof SingleWordMultiItemLayer_1.SingleWordMultiItemLayer) {
                    let multiArgumentLayer = this.layers.get(ViewLayerType_1.ViewLayerType.ENGLISH_PROPBANK);
                    return multiArgumentLayer.getItemAt(index);
                }
            }
        }
        /**
         * Layers may contain multiple morphological parse information corresponding to multiple Turkish words. This method
         * returns the morphological parse at position index.
         * @param index Position of the Turkish word.
         * @return The morphological parse at position index.
         */
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
        /**
         * Layers may contain multiple metamorphic parse information corresponding to multiple Turkish words. This method
         * returns the metamorphic parse at position index.
         * @param index Position of the Turkish word.
         * @return The metamorphic parse at position index.
         */
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
        /**
         * Layers may contain multiple metamorphemes corresponding to one or multiple Turkish words. This method
         * returns the metamorpheme at position index.
         * @param index Position of the metamorpheme.
         * @return The metamorpheme at position index.
         */
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
        /**
         * Layers may contain multiple metamorphemes corresponding to one or multiple Turkish words. This method
         * returns all metamorphemes from position index.
         * @param index Start position of the metamorpheme.
         * @return All metamorphemes from position index.
         */
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
        /**
         * For layers with multiple item information, this method returns total items in that layer.
         * @param viewLayer Layer name
         * @return Total items in the given layer.
         */
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
        /**
         * For layers with multiple item information, this method returns the item at position index.
         * @param viewLayer Layer name
         * @param index Position of the item.
         * @return The item at position index.
         */
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
        /**
         * Returns the string form of all layer information except part_of_speech layer.
         * @return The string form of all layer information except part_of_speech layer.
         */
        getLayerDescription() {
            let result = "";
            for (let viewLayerType of this.layers.keys()) {
                if (viewLayerType != ViewLayerType_1.ViewLayerType.PART_OF_SPEECH) {
                    result = result + this.layers.get(viewLayerType).getLayerDescription();
                }
            }
            return result;
        }
        /**
         * Returns the layer info for the given layer.
         * @param viewLayer Layer name.
         * @return Layer info for the given layer.
         */
        getLayerData(viewLayer) {
            if (this.layers.has(viewLayer)) {
                return this.layers.get(viewLayer).getLayerValue();
            }
            else {
                return null;
            }
        }
        /**
         * Returns the layer info for the given layer, if that layer exists. Otherwise, it returns the fallback layer info
         * determined by the checkLayer.
         * @param viewLayer Layer name
         * @return Layer info for the given layer if it exists. Otherwise, it returns the fallback layer info determined by
         * the checkLayer.
         */
        getRobustLayerData(viewLayer) {
            viewLayer = this.checkLayer(viewLayer);
            return this.getLayerData(viewLayer);
        }
        /**
         * Initializes the metamorphemesmoved layer with metamorpheme layer except the root word.
         */
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
        /**
         * Removes the given layer from hash map.
         * @param layerType Layer to be removed.
         */
        removeLayer(layerType) {
            this.layers.delete(layerType);
        }
        /**
         * Removes metamorpheme and metamorphemesmoved layers.
         */
        metaMorphemeClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME);
            this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED);
        }
        /**
         * Removes English layer.
         */
        englishClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.ENGLISH_WORD);
        }
        /**
         * Removes the dependency layer.
         */
        dependencyClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.DEPENDENCY);
        }
        /**
         * Removed metamorphemesmoved layer.
         */
        metaMorphemesMovedClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED);
        }
        /**
         * Removes the Turkish semantic layer.
         */
        semanticClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.SEMANTICS);
        }
        /**
         * Removes the English semantic layer.
         */
        englishSemanticClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.ENGLISH_SEMANTICS);
        }
        /**
         * Removes the morphological analysis, part of speech, metamorpheme, and metamorphemesmoved layers.
         */
        morphologicalAnalysisClear() {
            this.layers.delete(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP);
            this.layers.delete(ViewLayerType_1.ViewLayerType.PART_OF_SPEECH);
            this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME);
            this.layers.delete(ViewLayerType_1.ViewLayerType.META_MORPHEME_MOVED);
        }
        /**
         * Removes the metamorpheme at position index.
         * @param index Position of the metamorpheme to be removed.
         * @return Metamorphemes concatenated as a string after the removed metamorpheme.
         */
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
        /**
         * Checks if the last inflectional group contains VERB tag.
         * @return True if the last inflectional group contains VERB tag, false otherwise.
         */
        isVerbal() {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP)) {
                return this.layers.get(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP).isVerbal();
            }
            else {
                return false;
            }
        }
        /**
         * Checks if the last verbal inflectional group contains ZERO tag.
         * @return True if the last verbal inflectional group contains ZERO tag, false otherwise.
         */
        isNominal() {
            if (this.layers.has(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP)) {
                return this.layers.get(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP).isNominal();
            }
            else {
                return false;
            }
        }
        /**
         * Creates an array list of LayerInfo objects, where each object correspond to one word in the tree node. Turkish
         * words, morphological parses, metamorpheme parses, semantic senses, shallow parses are divided into corresponding
         * words. Named entity tags and propbank arguments are the same for all words.
         * @return An array list of LayerInfo objects created from the layer info of the node.
         */
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
        /**
         * Converts layer info of the word at position wordIndex to an AnnotatedWord. Layers are converted to their
         * counterparts in the AnnotatedWord.
         * @param wordIndex Index of the word to be converted.
         * @return Converted annotatedWord
         */
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