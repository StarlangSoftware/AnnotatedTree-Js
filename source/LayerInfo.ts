import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {WordLayer} from "./Layer/WordLayer";
import {TurkishWordLayer} from "./Layer/TurkishWordLayer";
import {PersianWordLayer} from "./Layer/PersianWordLayer";
import {EnglishWordLayer} from "./Layer/EnglishWordLayer";
import {MorphologicalAnalysisLayer} from "./Layer/MorphologicalAnalysisLayer";
import {MetaMorphemeLayer} from "./Layer/MetaMorphemeLayer";
import {MetaMorphemesMovedLayer} from "./Layer/MetaMorphemesMovedLayer";
import {DependencyLayer} from "./Layer/DependencyLayer";
import {TurkishSemanticLayer} from "./Layer/TurkishSemanticLayer";
import {NERLayer} from "./Layer/NERLayer";
import {TurkishPropbankLayer} from "./Layer/TurkishPropbankLayer";
import {EnglishPropbankLayer} from "./Layer/EnglishPropbankLayer";
import {EnglishSemanticLayer} from "./Layer/EnglishSemanticLayer";
import {ShallowParseLayer} from "./Layer/ShallowParseLayer";
import {MorphologicalParse} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalParse";
import {MetamorphicParse} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
import {MultiWordLayer} from "./Layer/MultiWordLayer";
import {Argument} from "nlptoolkit-propbank/dist/Argument";
import {SingleWordMultiItemLayer} from "./Layer/SingleWordMultiItemLayer";
import {MultiWordMultiItemLayer} from "./Layer/MultiWordMultiItemLayer";
import {AnnotatedWord} from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";

export class LayerInfo {

    private layers: Map<ViewLayerType, WordLayer> = new Map<ViewLayerType, WordLayer>()

    /**
     * Constructs the layer information from the given string. Layers are represented as
     * {layername1=layervalue1}{layername2=layervalue2}...{layernamek=layervaluek} where layer name is one of the
     * following: turkish, persian, english, morphologicalAnalysis, metaMorphemes, metaMorphemesMoved, dependency,
     * semantics, namedEntity, propBank, englishPropbank, englishSemantics, shallowParse. Splits the string w.r.t.
     * parentheses and constructs layer objects and put them layers map accordingly.
     * @param info Line consisting of layer info.
     */
    constructor(info?: string) {
        let splitLayers = info.split(/[{}]/);
        for (let layer of splitLayers) {
            if (layer == "") {
                continue;
            }
            let layerType = layer.substring(0, layer.indexOf("="));
            let layerValue = layer.substring(layer.indexOf("=") + 1);
            switch (layerType) {
                case "turkish":
                    this.layers.set(ViewLayerType.TURKISH_WORD, new TurkishWordLayer(layerValue));
                    break;
                case "persian":
                    this.layers.set(ViewLayerType.PERSIAN_WORD, new PersianWordLayer(layerValue));
                    break;
                case "english":
                    this.layers.set(ViewLayerType.ENGLISH_WORD, new EnglishWordLayer(layerValue));
                    break;
                case "morphologicalAnalysis":
                    this.layers.set(ViewLayerType.INFLECTIONAL_GROUP, new MorphologicalAnalysisLayer(layerValue));
                    this.layers.set(ViewLayerType.PART_OF_SPEECH, new MorphologicalAnalysisLayer(layerValue));
                    break;
                case "metaMorphemes":
                    this.layers.set(ViewLayerType.META_MORPHEME, new MetaMorphemeLayer(layerValue));
                    break;
                case "metaMorphemesMoved":
                    this.layers.set(ViewLayerType.META_MORPHEME_MOVED, new MetaMorphemesMovedLayer(layerValue));
                    break;
                case "dependency":
                    this.layers.set(ViewLayerType.DEPENDENCY, new DependencyLayer(layerValue));
                    break;
                case "semantics":
                    this.layers.set(ViewLayerType.SEMANTICS, new TurkishSemanticLayer(layerValue));
                    break;
                case "namedEntity":
                    this.layers.set(ViewLayerType.NER, new NERLayer(layerValue));
                    break;
                case "propBank":
                    this.layers.set(ViewLayerType.PROPBANK, new TurkishPropbankLayer(layerValue));
                    break;
                case "englishPropbank":
                    this.layers.set(ViewLayerType.ENGLISH_PROPBANK, new EnglishPropbankLayer(layerValue));
                    break;
                case "englishSemantics":
                    this.layers.set(ViewLayerType.ENGLISH_SEMANTICS, new EnglishSemanticLayer(layerValue));
                    break;
                case "shallowParse":
                    this.layers.set(ViewLayerType.SHALLOW_PARSE, new ShallowParseLayer(layerValue));
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
    setLayerData(viewLayer: ViewLayerType, layerValue: string) {
        switch (viewLayer) {
            case ViewLayerType.PERSIAN_WORD:
                this.layers.set(ViewLayerType.PERSIAN_WORD, new PersianWordLayer(layerValue));
                this.layers.delete(ViewLayerType.SEMANTICS);
                break;
            case ViewLayerType.TURKISH_WORD:
                this.layers.set(ViewLayerType.TURKISH_WORD, new TurkishWordLayer(layerValue));
                this.layers.delete(ViewLayerType.INFLECTIONAL_GROUP);
                this.layers.delete(ViewLayerType.PART_OF_SPEECH);
                this.layers.delete(ViewLayerType.META_MORPHEME);
                this.layers.delete(ViewLayerType.META_MORPHEME_MOVED);
                this.layers.delete(ViewLayerType.SEMANTICS);
                break;
            case ViewLayerType.ENGLISH_WORD:
                this.layers.set(ViewLayerType.ENGLISH_WORD, new EnglishWordLayer(layerValue));
                break;
            case ViewLayerType.PART_OF_SPEECH:
            case ViewLayerType.INFLECTIONAL_GROUP:
                this.layers.set(ViewLayerType.INFLECTIONAL_GROUP, new MorphologicalAnalysisLayer(layerValue));
                this.layers.set(ViewLayerType.PART_OF_SPEECH, new MorphologicalAnalysisLayer(layerValue));
                this.layers.delete(ViewLayerType.META_MORPHEME_MOVED);
                break;
            case ViewLayerType.META_MORPHEME:
                this.layers.set(ViewLayerType.META_MORPHEME, new MetaMorphemeLayer(layerValue));
                break;
            case ViewLayerType.META_MORPHEME_MOVED:
                this.layers.set(ViewLayerType.META_MORPHEME_MOVED, new MetaMorphemesMovedLayer(layerValue));
                break;
            case ViewLayerType.DEPENDENCY:
                this.layers.set(ViewLayerType.DEPENDENCY, new DependencyLayer(layerValue));
                break;
            case ViewLayerType.SEMANTICS:
                this.layers.set(ViewLayerType.SEMANTICS, new TurkishSemanticLayer(layerValue));
                break;
            case ViewLayerType.ENGLISH_SEMANTICS:
                this.layers.set(ViewLayerType.ENGLISH_SEMANTICS, new EnglishSemanticLayer(layerValue));
                break;
            case ViewLayerType.NER:
                this.layers.set(ViewLayerType.NER, new NERLayer(layerValue));
                break;
            case ViewLayerType.PROPBANK:
                this.layers.set(ViewLayerType.PROPBANK, new TurkishPropbankLayer(layerValue));
                break;
            case ViewLayerType.ENGLISH_PROPBANK:
                this.layers.set(ViewLayerType.ENGLISH_PROPBANK, new EnglishPropbankLayer(layerValue));
                break;
            case ViewLayerType.SHALLOW_PARSE:
                this.layers.set(ViewLayerType.SHALLOW_PARSE, new ShallowParseLayer(layerValue));
                break;
        }
    }

    /**
     * Updates the inflectional_group and part_of_speech layers according to the given parse.
     * @param parse New parse to update layers.
     */
    setMorphologicalAnalysis(parse: MorphologicalParse) {
        this.layers.set(ViewLayerType.INFLECTIONAL_GROUP, new MorphologicalAnalysisLayer(parse.toString()));
        this.layers.set(ViewLayerType.PART_OF_SPEECH, new MorphologicalAnalysisLayer(parse.toString()));
    }

    /**
     * Updates the metamorpheme layer according to the given parse.
     * @param parse NEw parse to update layer.
     */
    setMetaMorphemes(parse: MetamorphicParse) {
        this.layers.set(ViewLayerType.META_MORPHEME, new MetaMorphemeLayer(parse.toString()));
    }

    /**
     * Checks if the given layer exists.
     * @param viewLayerType Layer name
     * @return True if the layer exists, false otherwise.
     */
    layerExists(viewLayerType: ViewLayerType): boolean {
        return this.layers.has(viewLayerType)
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
    checkLayer(viewLayer: ViewLayerType): ViewLayerType {
        switch (viewLayer) {
            case ViewLayerType.TURKISH_WORD:
            case ViewLayerType.PERSIAN_WORD:
            case ViewLayerType.ENGLISH_SEMANTICS:
                if (!this.layers.has(viewLayer)) {
                    return ViewLayerType.ENGLISH_WORD;
                }
            case ViewLayerType.PART_OF_SPEECH:
            case ViewLayerType.INFLECTIONAL_GROUP:
            case ViewLayerType.META_MORPHEME:
            case ViewLayerType.SEMANTICS:
            case ViewLayerType.NER:
            case ViewLayerType.PROPBANK:
            case ViewLayerType.SHALLOW_PARSE:
            case ViewLayerType.ENGLISH_PROPBANK:
                if (!this.layers.has(viewLayer))
                    return this.checkLayer(ViewLayerType.TURKISH_WORD);
                break;
            case ViewLayerType.META_MORPHEME_MOVED:
                if (!this.layers.has(viewLayer))
                    return this.checkLayer(ViewLayerType.META_MORPHEME);
                break;
        }
        return viewLayer;
    }

    /**
     * Returns number of words in the Turkish or Persian layer, whichever exists.
     * @return Number of words in the Turkish or Persian layer, whichever exists.
     */
    getNumberOfWords(): number {
        if (this.layers.has(ViewLayerType.TURKISH_WORD)) {
            return (<TurkishWordLayer>this.layers.get(ViewLayerType.TURKISH_WORD)).size();
        } else {
            if (this.layers.has(ViewLayerType.PERSIAN_WORD)) {
                return (<PersianWordLayer>this.layers.get(ViewLayerType.PERSIAN_WORD)).size();
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
    private getMultiWordAt(viewLayerType: ViewLayerType, index: number, layerName: string): string {
        if (this.layers.has(viewLayerType)) {
            if (this.layers.get(viewLayerType) instanceof MultiWordLayer) {
                let multiWordLayer = <MultiWordLayer<string>>this.layers.get(viewLayerType);
                if (index < multiWordLayer.size() && index >= 0) {
                    return multiWordLayer.getItemAt(index);
                } else {
                    if (viewLayerType == ViewLayerType.SEMANTICS) {
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
    getTurkishWordAt(index: number): string {
        return this.getMultiWordAt(ViewLayerType.TURKISH_WORD, index, "turkish");
    }

    /**
     * Returns number of meanings in the Turkish layer.
     * @return Number of meanings in the Turkish layer.
     */
    getNumberOfMeanings(): number {
        if (this.layers.has(ViewLayerType.SEMANTICS)) {
            return (<TurkishSemanticLayer>this.layers.get(ViewLayerType.SEMANTICS)).size();
        } else {
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
    getSemanticAt(index: number): string {
        return this.getMultiWordAt(ViewLayerType.SEMANTICS, index, "semantics");
    }

    /**
     * Layers may contain multiple shallow parse information corresponding to multiple Turkish words. This method
     * returns the shallow parse tag at position index.
     * @param index Position of the Turkish word.
     * @throws LayerNotExistsException If the layer does not exist, it throws LayerNotExistsException.
     * @throws WordNotExistsException If the index is out of bounds, it throws WordNotExistsException.
     * @return The shallow parse tag at position index.
     */
    getShallowParseAt(index: number): string {
        return this.getMultiWordAt(ViewLayerType.SHALLOW_PARSE, index, "shallowParse");
    }

    /**
     * Returns the Turkish PropBank argument info.
     * @return Turkish PropBank argument info.
     */
    getArgument(): Argument {
        if (this.layers.has(ViewLayerType.PROPBANK)) {
            if (this.layers.get(ViewLayerType.PROPBANK) instanceof TurkishPropbankLayer) {
                let argumentLayer = <TurkishPropbankLayer>this.layers.get(ViewLayerType.PROPBANK);
                return argumentLayer.getArgument();
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    /**
     * A word may have multiple English propbank info. This method returns the English PropBank argument info at
     * position index.
     * @return English PropBank argument info at position index.
     */
    getArgumentAt(index: number): Argument {
        if (this.layers.has(ViewLayerType.ENGLISH_PROPBANK)) {
            if (this.layers.get(ViewLayerType.ENGLISH_PROPBANK) instanceof SingleWordMultiItemLayer) {
                let multiArgumentLayer = <SingleWordMultiItemLayer<Argument>>this.layers.get(ViewLayerType.ENGLISH_PROPBANK);
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
    getMorphologicalParseAt(index: number): MorphologicalParse {
        if (this.layers.has(ViewLayerType.INFLECTIONAL_GROUP)) {
            if (this.layers.get(ViewLayerType.INFLECTIONAL_GROUP) instanceof MultiWordLayer) {
                let multiWordLayer = <MultiWordLayer<MorphologicalParse>>this.layers.get(ViewLayerType.INFLECTIONAL_GROUP);
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
    getMetamorphicParseAt(index: number): MetamorphicParse {
        if (this.layers.has(ViewLayerType.META_MORPHEME)) {
            if (this.layers.get(ViewLayerType.META_MORPHEME) instanceof MultiWordLayer) {
                let multiWordLayer = <MultiWordLayer<MetamorphicParse>>this.layers.get(ViewLayerType.META_MORPHEME);
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
    getMetaMorphemeAtIndex(index: number): string {
        if (this.layers.has(ViewLayerType.META_MORPHEME)) {
            if (this.layers.get(ViewLayerType.META_MORPHEME) instanceof MetaMorphemeLayer) {
                let metaMorphemeLayer = <MetaMorphemeLayer>this.layers.get(ViewLayerType.META_MORPHEME);
                if (index < metaMorphemeLayer.getLayerSize(ViewLayerType.META_MORPHEME) && index >= 0) {
                    return metaMorphemeLayer.getLayerInfoAt(ViewLayerType.META_MORPHEME, index);
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
    getMetaMorphemeFromIndex(index: number): string {
        if (this.layers.has(ViewLayerType.META_MORPHEME)) {
            if (this.layers.get(ViewLayerType.META_MORPHEME) instanceof MetaMorphemeLayer) {
                let metaMorphemeLayer = <MetaMorphemeLayer>this.layers.get(ViewLayerType.META_MORPHEME);
                if (index < metaMorphemeLayer.getLayerSize(ViewLayerType.META_MORPHEME) && index >= 0) {
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
    getLayerSize(viewLayer: ViewLayerType): number {
        if (this.layers.get(viewLayer) instanceof MultiWordMultiItemLayer) {
            return (<MultiWordMultiItemLayer<any>>this.layers.get(viewLayer)).getLayerSize(viewLayer);
        } else {
            if (this.layers.get(viewLayer) instanceof SingleWordMultiItemLayer) {
                return (<SingleWordMultiItemLayer<any>>this.layers.get(viewLayer)).getLayerSize(viewLayer);
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
    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string {
        switch (viewLayer) {
            case ViewLayerType.META_MORPHEME_MOVED:
            case ViewLayerType.PART_OF_SPEECH:
            case ViewLayerType.INFLECTIONAL_GROUP:
                if (this.layers.get(viewLayer) instanceof MultiWordMultiItemLayer) {
                    return (<MultiWordMultiItemLayer<any>>this.layers.get(viewLayer)).getLayerInfoAt(viewLayer, index);
                }
                break;
            case ViewLayerType.META_MORPHEME:
                return this.getMetaMorphemeAtIndex(index);
            case ViewLayerType.ENGLISH_PROPBANK:
                return this.getArgumentAt(index).getArgumentType();
            default:
                return null;
        }
    }

    /**
     * Returns the string form of all layer information except part_of_speech layer.
     * @return The string form of all layer information except part_of_speech layer.
     */
    getLayerDescription(): string {
        let result = "";
        for (let viewLayerType of this.layers.keys()) {
            if (viewLayerType != ViewLayerType.PART_OF_SPEECH) {
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
    getLayerData(viewLayer: ViewLayerType): string {
        if (this.layers.has(viewLayer)) {
            return this.layers.get(viewLayer).getLayerValue();
        } else {
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
    getRobustLayerData(viewLayer: ViewLayerType): string {
        viewLayer = this.checkLayer(viewLayer);
        return this.getLayerData(viewLayer);
    }

    /**
     * Initializes the metamorphemesmoved layer with metamorpheme layer except the root word.
     */
    private updateMetaMorphemesMoved() {
        if (this.layers.has(ViewLayerType.META_MORPHEME)) {
            let metaMorphemeLayer = <MetaMorphemeLayer>this.layers.get(ViewLayerType.META_MORPHEME);
            if (metaMorphemeLayer.size() > 0) {
                let result = metaMorphemeLayer.getItemAt(0).toString();
                for (let i = 1; i < metaMorphemeLayer.size(); i++) {
                    result = result + " " + metaMorphemeLayer.getItemAt(i).toString();
                }
                this.layers.set(ViewLayerType.META_MORPHEME_MOVED, new MetaMorphemesMovedLayer(result));
            }
        }
    }

    /**
     * Removes the given layer from hash map.
     * @param layerType Layer to be removed.
     */
    removeLayer(layerType: ViewLayerType) {
        this.layers.delete(layerType)
    }

    /**
     * Removes metamorpheme and metamorphemesmoved layers.
     */
    metaMorphemeClear() {
        this.layers.delete(ViewLayerType.META_MORPHEME);
        this.layers.delete(ViewLayerType.META_MORPHEME_MOVED);
    }

    /**
     * Removes English layer.
     */
    englishClear() {
        this.layers.delete(ViewLayerType.ENGLISH_WORD);
    }

    /**
     * Removes the dependency layer.
     */
    dependencyClear() {
        this.layers.delete(ViewLayerType.DEPENDENCY);
    }

    /**
     * Removed metamorphemesmoved layer.
     */
    metaMorphemesMovedClear() {
        this.layers.delete(ViewLayerType.META_MORPHEME_MOVED);
    }

    /**
     * Removes the Turkish semantic layer.
     */
    semanticClear() {
        this.layers.delete(ViewLayerType.SEMANTICS);
    }

    /**
     * Removes the English semantic layer.
     */
    englishSemanticClear() {
        this.layers.delete(ViewLayerType.ENGLISH_SEMANTICS);
    }

    /**
     * Removes the morphological analysis, part of speech, metamorpheme, and metamorphemesmoved layers.
     */
    morphologicalAnalysisClear() {
        this.layers.delete(ViewLayerType.INFLECTIONAL_GROUP);
        this.layers.delete(ViewLayerType.PART_OF_SPEECH);
        this.layers.delete(ViewLayerType.META_MORPHEME);
        this.layers.delete(ViewLayerType.META_MORPHEME_MOVED);
    }

    /**
     * Removes the metamorpheme at position index.
     * @param index Position of the metamorpheme to be removed.
     * @return Metamorphemes concatenated as a string after the removed metamorpheme.
     */
    metaMorphemeRemove(index: number): MetamorphicParse {
        let removedParse
        if (this.layers.has(ViewLayerType.META_MORPHEME)) {
            let metaMorphemeLayer = <MetaMorphemeLayer>this.layers.get(ViewLayerType.META_MORPHEME);
            if (index >= 0 && index < metaMorphemeLayer.getLayerSize(ViewLayerType.META_MORPHEME)) {
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
    isVerbal(): boolean {
        if (this.layers.has(ViewLayerType.INFLECTIONAL_GROUP)) {
            return (<MorphologicalAnalysisLayer>this.layers.get(ViewLayerType.INFLECTIONAL_GROUP)).isVerbal();
        } else {
            return false;
        }
    }

    /**
     * Checks if the last verbal inflectional group contains ZERO tag.
     * @return True if the last verbal inflectional group contains ZERO tag, false otherwise.
     */
    isNominal(): boolean {
        if (this.layers.has(ViewLayerType.INFLECTIONAL_GROUP)) {
            return (<MorphologicalAnalysisLayer>this.layers.get(ViewLayerType.INFLECTIONAL_GROUP)).isNominal();
        } else {
            return false;
        }
    }

    /**
     * Creates an array list of LayerInfo objects, where each object correspond to one word in the tree node. Turkish
     * words, morphological parses, metamorpheme parses, semantic senses, shallow parses are divided into corresponding
     * words. Named entity tags and propbank arguments are the same for all words.
     * @return An array list of LayerInfo objects created from the layer info of the node.
     */
    divideIntoWords(): Array<LayerInfo> {
        let result = new Array<LayerInfo>();
        for (let i = 0; i < this.getNumberOfWords(); i++) {
            let layerInfo = new LayerInfo();
            layerInfo.setLayerData(ViewLayerType.TURKISH_WORD, this.getTurkishWordAt(i));
            layerInfo.setLayerData(ViewLayerType.ENGLISH_WORD, this.getLayerData(ViewLayerType.ENGLISH_WORD));
            if (this.layerExists(ViewLayerType.INFLECTIONAL_GROUP)) {
                layerInfo.setMorphologicalAnalysis(this.getMorphologicalParseAt(i));
            }
            if (this.layerExists(ViewLayerType.META_MORPHEME)) {
                layerInfo.setMetaMorphemes(this.getMetamorphicParseAt(i));
            }
            if (this.layerExists(ViewLayerType.ENGLISH_PROPBANK)) {
                layerInfo.setLayerData(ViewLayerType.ENGLISH_PROPBANK, this.getLayerData(ViewLayerType.ENGLISH_PROPBANK));
            }
            if (this.layerExists(ViewLayerType.ENGLISH_SEMANTICS)) {
                layerInfo.setLayerData(ViewLayerType.ENGLISH_SEMANTICS, this.getLayerData(ViewLayerType.ENGLISH_SEMANTICS));
            }
            if (this.layerExists(ViewLayerType.NER)) {
                layerInfo.setLayerData(ViewLayerType.NER, this.getLayerData(ViewLayerType.NER));
            }
            if (this.layerExists(ViewLayerType.SEMANTICS)) {
                layerInfo.setLayerData(ViewLayerType.SEMANTICS, this.getSemanticAt(i));
            }
            if (this.layerExists(ViewLayerType.PROPBANK)) {
                layerInfo.setLayerData(ViewLayerType.PROPBANK, this.getArgument().toString());
            }
            if (this.layerExists(ViewLayerType.SHALLOW_PARSE)) {
                layerInfo.setLayerData(ViewLayerType.SHALLOW_PARSE, this.getShallowParseAt(i));
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
    toAnnotatedWord(wordIndex: number): AnnotatedWord {
        let annotatedWord = new AnnotatedWord(this.getTurkishWordAt(wordIndex));
        if (this.layerExists(ViewLayerType.INFLECTIONAL_GROUP)) {
            annotatedWord.setParse(this.getMorphologicalParseAt(wordIndex).toString());
        }
        if (this.layerExists(ViewLayerType.META_MORPHEME)) {
            annotatedWord.setMetamorphicParse(this.getMetamorphicParseAt(wordIndex).toString());
        }
        if (this.layerExists(ViewLayerType.SEMANTICS)) {
            annotatedWord.setSemantic(this.getSemanticAt(wordIndex));
        }
        if (this.layerExists(ViewLayerType.NER)) {
            annotatedWord.setNamedEntityType(this.getLayerData(ViewLayerType.NER));
        }
        if (this.layerExists(ViewLayerType.PROPBANK)) {
            annotatedWord.setArgumentList(this.getArgument().toString());
        }
        if (this.layerExists(ViewLayerType.SHALLOW_PARSE)) {
            annotatedWord.setShallowParse(this.getShallowParseAt(wordIndex));
        }
        return annotatedWord;
    }
}