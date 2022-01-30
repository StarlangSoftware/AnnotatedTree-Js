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

    constructor(info?: string) {
        let splitLayers = info.split(/[{}]/);
        for (let layer of splitLayers){
            if (layer == ""){
                continue;
            }
            let layerType = layer.substring(0, layer.indexOf("="));
            let layerValue = layer.substring(layer.indexOf("=") + 1);
            if (layerType == "turkish"){
                this.layers.set(ViewLayerType.TURKISH_WORD, new TurkishWordLayer(layerValue));
            } else {
                if (layerType == "persian"){
                    this.layers.set(ViewLayerType.PERSIAN_WORD, new PersianWordLayer(layerValue));
                } else {
                    if (layerType == "english"){
                        this.layers.set(ViewLayerType.ENGLISH_WORD, new EnglishWordLayer(layerValue));
                    } else {
                        if (layerType == "morphologicalAnalysis"){
                            this.layers.set(ViewLayerType.INFLECTIONAL_GROUP, new MorphologicalAnalysisLayer(layerValue));
                            this.layers.set(ViewLayerType.PART_OF_SPEECH, new MorphologicalAnalysisLayer(layerValue));
                        } else {
                            if (layerType == "metaMorphemes"){
                                this.layers.set(ViewLayerType.META_MORPHEME, new MetaMorphemeLayer(layerValue));
                            } else {
                                if (layerType == "metaMorphemesMoved"){
                                    this.layers.set(ViewLayerType.META_MORPHEME_MOVED, new MetaMorphemesMovedLayer(layerValue));
                                } else {
                                    if (layerType == "dependency"){
                                        this.layers.set(ViewLayerType.DEPENDENCY, new DependencyLayer(layerValue));
                                    } else {
                                        if (layerType == "semantics"){
                                            this.layers.set(ViewLayerType.SEMANTICS, new TurkishSemanticLayer(layerValue));
                                        } else {
                                            if (layerType == "namedEntity"){
                                                this.layers.set(ViewLayerType.NER, new NERLayer(layerValue));
                                            } else {
                                                if (layerType == "propBank"){
                                                    this.layers.set(ViewLayerType.PROPBANK, new TurkishPropbankLayer(layerValue));
                                                } else {
                                                    if (layerType == "englishPropbank"){
                                                        this.layers.set(ViewLayerType.ENGLISH_PROPBANK, new EnglishPropbankLayer(layerValue));
                                                    } else {
                                                        if (layerType == "englishSemantics"){
                                                            this.layers.set(ViewLayerType.ENGLISH_SEMANTICS, new EnglishSemanticLayer(layerValue));
                                                        } else {
                                                            if (layerType == "shallowParse"){
                                                                this.layers.set(ViewLayerType.SHALLOW_PARSE, new ShallowParseLayer(layerValue));
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

    setLayerData(viewLayer: ViewLayerType, layerValue: string){
        switch (viewLayer){
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

    setMorphologicalAnalysis(parse: MorphologicalParse){
        this.layers.set(ViewLayerType.INFLECTIONAL_GROUP, new MorphologicalAnalysisLayer(parse.toString()));
        this.layers.set(ViewLayerType.PART_OF_SPEECH, new MorphologicalAnalysisLayer(parse.toString()));
    }

    setMetaMorphemes(parse: MetamorphicParse){
        this.layers.set(ViewLayerType.META_MORPHEME, new MetaMorphemeLayer(parse.toString()));
    }

    layerExists(viewLayerType: ViewLayerType): boolean{
        return this.layers.has(viewLayerType)
    }

    checkLayer(viewLayer: ViewLayerType): ViewLayerType{
        switch (viewLayer){
            case ViewLayerType.TURKISH_WORD:
            case ViewLayerType.PERSIAN_WORD:
            case ViewLayerType.ENGLISH_SEMANTICS:
                if (!this.layers.has(viewLayer)){
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

    getNumberOfWords(): number{
        if (this.layers.has(ViewLayerType.TURKISH_WORD)){
            return (<TurkishWordLayer> this.layers.get(ViewLayerType.TURKISH_WORD)).size();
        } else {
            if (this.layers.has(ViewLayerType.PERSIAN_WORD)){
                return (<PersianWordLayer> this.layers.get(ViewLayerType.PERSIAN_WORD)).size();
            }
        }
    }

    private getMultiWordAt(viewLayerType: ViewLayerType, index: number, layerName: string): string{
        if (this.layers.has(viewLayerType)){
            if (this.layers.get(viewLayerType) instanceof MultiWordLayer){
                let multiWordLayer = <MultiWordLayer<string>> this.layers.get(viewLayerType);
                if (index < multiWordLayer.size() && index >= 0){
                    return multiWordLayer.getItemAt(index);
                } else {
                    if (viewLayerType == ViewLayerType.SEMANTICS){
                        return multiWordLayer.getItemAt(multiWordLayer.size() - 1);
                    }
                }
            }
        }
    }

    getTurkishWordAt(index: number): string{
        return this.getMultiWordAt(ViewLayerType.TURKISH_WORD, index, "turkish");
    }

    getNumberOfMeanings(): number{
        if (this.layers.has(ViewLayerType.SEMANTICS)){
            return (<TurkishSemanticLayer> this.layers.get(ViewLayerType.SEMANTICS)).size();
        } else {
            return 0;
        }
    }

    getSemanticAt(index: number): string{
        return this.getMultiWordAt(ViewLayerType.SEMANTICS, index, "semantics");
    }

    getShallowParseAt(index: number): string{
        return this.getMultiWordAt(ViewLayerType.SHALLOW_PARSE, index, "shallowParse");
    }

    getArgument(): Argument{
        if (this.layers.has(ViewLayerType.PROPBANK)){
            if (this.layers.get(ViewLayerType.PROPBANK) instanceof TurkishPropbankLayer){
                let argumentLayer = <TurkishPropbankLayer> this.layers.get(ViewLayerType.PROPBANK);
                return argumentLayer.getArgument();
            } else {
                return null;
            }
        } else {
            return null;
        }
    }

    getArgumentAt(index: number): Argument{
        if (this.layers.has(ViewLayerType.ENGLISH_PROPBANK)){
            if (this.layers.get(ViewLayerType.ENGLISH_PROPBANK) instanceof SingleWordMultiItemLayer){
                let multiArgumentLayer = <SingleWordMultiItemLayer<Argument>> this.layers.get(ViewLayerType.ENGLISH_PROPBANK);
                return multiArgumentLayer.getItemAt(index);
            }
        }
    }

    getMorphologicalParseAt(index: number): MorphologicalParse{
        if (this.layers.has(ViewLayerType.INFLECTIONAL_GROUP)){
            if (this.layers.get(ViewLayerType.INFLECTIONAL_GROUP) instanceof MultiWordLayer){
                let multiWordLayer = <MultiWordLayer<MorphologicalParse>> this.layers.get(ViewLayerType.INFLECTIONAL_GROUP);
                if (index < multiWordLayer.size() && index >= 0){
                    return multiWordLayer.getItemAt(index);
                }
            }
        }
    }

    getMetamorphicParseAt(index: number): MetamorphicParse{
        if (this.layers.has(ViewLayerType.META_MORPHEME)){
            if (this.layers.get(ViewLayerType.META_MORPHEME) instanceof MultiWordLayer){
                let multiWordLayer = <MultiWordLayer<MetamorphicParse>> this.layers.get(ViewLayerType.META_MORPHEME);
                if (index < multiWordLayer.size() && index >= 0){
                    return multiWordLayer.getItemAt(index);
                }
            }
        }
    }

    getMetaMorphemeAtIndex(index: number): string{
        if (this.layers.has(ViewLayerType.META_MORPHEME)){
            if (this.layers.get(ViewLayerType.META_MORPHEME) instanceof MetaMorphemeLayer){
                let metaMorphemeLayer = <MetaMorphemeLayer> this.layers.get(ViewLayerType.META_MORPHEME);
                if (index < metaMorphemeLayer.getLayerSize(ViewLayerType.META_MORPHEME) && index >= 0){
                    return metaMorphemeLayer.getLayerInfoAt(ViewLayerType.META_MORPHEME, index);
                }
            }
        }
    }

    getMetaMorphemeFromIndex(index: number): string{
        if (this.layers.has(ViewLayerType.META_MORPHEME)){
            if (this.layers.get(ViewLayerType.META_MORPHEME) instanceof MetaMorphemeLayer){
                let metaMorphemeLayer = <MetaMorphemeLayer> this.layers.get(ViewLayerType.META_MORPHEME);
                if (index < metaMorphemeLayer.getLayerSize(ViewLayerType.META_MORPHEME) && index >= 0){
                    return metaMorphemeLayer.getLayerInfoFrom(index);
                }
            }
        }
    }

    getLayerSize(viewLayer: ViewLayerType): number{
        if (this.layers.get(viewLayer) instanceof MultiWordMultiItemLayer){
            return (<MultiWordMultiItemLayer<any>> this.layers.get(viewLayer)).getLayerSize(viewLayer);
        } else {
            if (this.layers.get(viewLayer) instanceof SingleWordMultiItemLayer){
                return (<SingleWordMultiItemLayer<any>> this.layers.get(viewLayer)).getLayerSize(viewLayer);
            }
        }
        return 0;
    }

    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string{
        switch (viewLayer){
            case ViewLayerType.META_MORPHEME_MOVED:
            case ViewLayerType.PART_OF_SPEECH:
            case ViewLayerType.INFLECTIONAL_GROUP:
                if (this.layers.get(viewLayer) instanceof MultiWordMultiItemLayer){
                    return (<MultiWordMultiItemLayer<any>> this.layers.get(viewLayer)).getLayerInfoAt(viewLayer, index);
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

    getLayerDescription(): string{
        let result = "";
        for (let viewLayerType of this.layers.keys()){
            if (viewLayerType != ViewLayerType.PART_OF_SPEECH){
                result = result + this.layers.get(viewLayerType).getLayerDescription();
            }
        }
        return result;
    }

    getLayerData(viewLayer: ViewLayerType): string{
        if (this.layers.has(viewLayer)){
            return this.layers.get(viewLayer).getLayerValue();
        } else {
            return null;
        }
    }

    getRobustLayerData(viewLayer: ViewLayerType): string{
        viewLayer = this.checkLayer(viewLayer);
        return this.getLayerData(viewLayer);
    }

    private updateMetaMorphemesMoved(){
        if (this.layers.has(ViewLayerType.META_MORPHEME)){
            let metaMorphemeLayer = <MetaMorphemeLayer> this.layers.get(ViewLayerType.META_MORPHEME);
            if (metaMorphemeLayer.size() > 0){
                let result = metaMorphemeLayer.getItemAt(0).toString();
                for (let i = 1; i < metaMorphemeLayer.size(); i++){
                    result = result + " " + metaMorphemeLayer.getItemAt(i).toString();
                }
                this.layers.set(ViewLayerType.META_MORPHEME_MOVED, new MetaMorphemesMovedLayer(result));
            }
        }
    }

    removeLayer(layerType: ViewLayerType){
        this.layers.delete(layerType)
    }

    metaMorphemeClear(){
        this.layers.delete(ViewLayerType.META_MORPHEME);
        this.layers.delete(ViewLayerType.META_MORPHEME_MOVED);
    }

    englishClear(){
        this.layers.delete(ViewLayerType.ENGLISH_WORD);
    }

    dependencyClear(){
        this.layers.delete(ViewLayerType.DEPENDENCY);
    }

    metaMorphemesMovedClear(){
        this.layers.delete(ViewLayerType.META_MORPHEME_MOVED);
    }

    semanticClear(){
        this.layers.delete(ViewLayerType.SEMANTICS);
    }

    englishSemanticClear(){
        this.layers.delete(ViewLayerType.ENGLISH_SEMANTICS);
    }

    morphologicalAnalysisClear(){
        this.layers.delete(ViewLayerType.INFLECTIONAL_GROUP);
        this.layers.delete(ViewLayerType.PART_OF_SPEECH);
        this.layers.delete(ViewLayerType.META_MORPHEME);
        this.layers.delete(ViewLayerType.META_MORPHEME_MOVED);
    }

    metaMorphemeRemove(index: number): MetamorphicParse{
        let removedParse
        if (this.layers.has(ViewLayerType.META_MORPHEME)){
            let metaMorphemeLayer = <MetaMorphemeLayer> this.layers.get(ViewLayerType.META_MORPHEME);
            if (index >= 0 && index < metaMorphemeLayer.getLayerSize(ViewLayerType.META_MORPHEME)){
                removedParse = metaMorphemeLayer.metaMorphemeRemoveFromIndex(index);
                this.updateMetaMorphemesMoved();
            }
        }
        return removedParse;
    }

    isVerbal(): boolean{
        if (this.layers.has(ViewLayerType.INFLECTIONAL_GROUP)){
            return (<MorphologicalAnalysisLayer> this.layers.get(ViewLayerType.INFLECTIONAL_GROUP)).isVerbal();
        } else {
            return false;
        }
    }

    isNominal(): boolean{
        if (this.layers.has(ViewLayerType.INFLECTIONAL_GROUP)){
            return (<MorphologicalAnalysisLayer> this.layers.get(ViewLayerType.INFLECTIONAL_GROUP)).isNominal();
        } else {
            return false;
        }
    }

    divideIntoWords(): Array<LayerInfo>{
        let result = new Array<LayerInfo>();
        for (let i = 0; i < this.getNumberOfWords(); i++){
            let layerInfo = new LayerInfo();
            layerInfo.setLayerData(ViewLayerType.TURKISH_WORD, this.getTurkishWordAt(i));
            layerInfo.setLayerData(ViewLayerType.ENGLISH_WORD, this.getLayerData(ViewLayerType.ENGLISH_WORD));
            if (this.layerExists(ViewLayerType.INFLECTIONAL_GROUP)){
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
            if (this.layerExists(ViewLayerType.NER)){
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

    toAnnotatedWord(wordIndex: number): AnnotatedWord{
        let annotatedWord = new AnnotatedWord(this.getTurkishWordAt(wordIndex));
        if (this.layerExists(ViewLayerType.INFLECTIONAL_GROUP)){
            annotatedWord.setParse(this.getMorphologicalParseAt(wordIndex).toString());
        }
        if (this.layerExists(ViewLayerType.META_MORPHEME)){
            annotatedWord.setMetamorphicParse(this.getMetamorphicParseAt(wordIndex).toString());
        }
        if (this.layerExists(ViewLayerType.SEMANTICS)){
            annotatedWord.setSemantic(this.getSemanticAt(wordIndex));
        }
        if (this.layerExists(ViewLayerType.NER)){
            annotatedWord.setNamedEntityType(this.getLayerData(ViewLayerType.NER));
        }
        if (this.layerExists(ViewLayerType.PROPBANK)){
            annotatedWord.setArgument(this.getArgument().toString());
        }
        if (this.layerExists(ViewLayerType.SHALLOW_PARSE)){
            annotatedWord.setShallowParse(this.getShallowParseAt(wordIndex));
        }
        return annotatedWord;
    }
}