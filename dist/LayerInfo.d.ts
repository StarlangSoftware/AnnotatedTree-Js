import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { MorphologicalParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalParse";
import { MetamorphicParse } from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
import { Argument } from "nlptoolkit-propbank/dist/Argument";
import { AnnotatedWord } from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";
export declare class LayerInfo {
    private layers;
    /**
     * Constructs the layer information from the given string. Layers are represented as
     * {layername1=layervalue1}{layername2=layervalue2}...{layernamek=layervaluek} where layer name is one of the
     * following: turkish, persian, english, morphologicalAnalysis, metaMorphemes, metaMorphemesMoved, dependency,
     * semantics, namedEntity, propBank, englishPropbank, englishSemantics, shallowParse. Splits the string w.r.t.
     * parentheses and constructs layer objects and put them layers map accordingly.
     * @param info Line consisting of layer info.
     */
    constructor(info?: string);
    /**
     * Changes the given layer info with the given string layer value. For all layers new layer object is created and
     * replaces the original object. For turkish layer, it also destroys inflectional_group, part_of_speech,
     * meta_morpheme, meta_morpheme_moved and semantics layers. For persian layer, it also destroys the semantics layer.
     * @param viewLayer Layer name.
     * @param layerValue New layer value.
     */
    setLayerData(viewLayer: ViewLayerType, layerValue: string): void;
    /**
     * Updates the inflectional_group and part_of_speech layers according to the given parse.
     * @param parse New parse to update layers.
     */
    setMorphologicalAnalysis(parse: MorphologicalParse): void;
    /**
     * Updates the metamorpheme layer according to the given parse.
     * @param parse NEw parse to update layer.
     */
    setMetaMorphemes(parse: MetamorphicParse): void;
    /**
     * Checks if the given layer exists.
     * @param viewLayerType Layer name
     * @return True if the layer exists, false otherwise.
     */
    layerExists(viewLayerType: ViewLayerType): boolean;
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
    checkLayer(viewLayer: ViewLayerType): ViewLayerType;
    /**
     * Returns number of words in the Turkish or Persian layer, whichever exists.
     * @return Number of words in the Turkish or Persian layer, whichever exists.
     */
    getNumberOfWords(): number;
    /**
     * Returns the layer value at the given index.
     * @param viewLayerType Layer for which the value at the given word index will be returned.
     * @param index Word Position of the layer value.
     * @param layerName Name of the layer.
     * @return Layer info at word position index for a multiword layer.
     */
    private getMultiWordAt;
    /**
     * Layers may contain multiple Turkish words. This method returns the Turkish word at position index.
     * @param index Position of the Turkish word.
     * @return The Turkish word at position index.
     */
    getTurkishWordAt(index: number): string;
    /**
     * Returns number of meanings in the Turkish layer.
     * @return Number of meanings in the Turkish layer.
     */
    getNumberOfMeanings(): number;
    /**
     * Layers may contain multiple semantic information corresponding to multiple Turkish words. This method returns
     * the sense id at position index.
     * @param index Position of the Turkish word.
     * @throws LayerNotExistsException If the layer does not exist, it throws LayerNotExistsException.
     * @throws WordNotExistsException If the index is out of bounds, it throws WordNotExistsException.
     * @return The Turkish sense id at position index.
     */
    getSemanticAt(index: number): string;
    /**
     * Layers may contain multiple shallow parse information corresponding to multiple Turkish words. This method
     * returns the shallow parse tag at position index.
     * @param index Position of the Turkish word.
     * @throws LayerNotExistsException If the layer does not exist, it throws LayerNotExistsException.
     * @throws WordNotExistsException If the index is out of bounds, it throws WordNotExistsException.
     * @return The shallow parse tag at position index.
     */
    getShallowParseAt(index: number): string;
    /**
     * Returns the Turkish PropBank argument info.
     * @return Turkish PropBank argument info.
     */
    getArgument(): Argument;
    /**
     * A word may have multiple English propbank info. This method returns the English PropBank argument info at
     * position index.
     * @return English PropBank argument info at position index.
     */
    getArgumentAt(index: number): Argument;
    /**
     * Layers may contain multiple morphological parse information corresponding to multiple Turkish words. This method
     * returns the morphological parse at position index.
     * @param index Position of the Turkish word.
     * @return The morphological parse at position index.
     */
    getMorphologicalParseAt(index: number): MorphologicalParse;
    /**
     * Layers may contain multiple metamorphic parse information corresponding to multiple Turkish words. This method
     * returns the metamorphic parse at position index.
     * @param index Position of the Turkish word.
     * @return The metamorphic parse at position index.
     */
    getMetamorphicParseAt(index: number): MetamorphicParse;
    /**
     * Layers may contain multiple metamorphemes corresponding to one or multiple Turkish words. This method
     * returns the metamorpheme at position index.
     * @param index Position of the metamorpheme.
     * @return The metamorpheme at position index.
     */
    getMetaMorphemeAtIndex(index: number): string;
    /**
     * Layers may contain multiple metamorphemes corresponding to one or multiple Turkish words. This method
     * returns all metamorphemes from position index.
     * @param index Start position of the metamorpheme.
     * @return All metamorphemes from position index.
     */
    getMetaMorphemeFromIndex(index: number): string;
    /**
     * For layers with multiple item information, this method returns total items in that layer.
     * @param viewLayer Layer name
     * @return Total items in the given layer.
     */
    getLayerSize(viewLayer: ViewLayerType): number;
    /**
     * For layers with multiple item information, this method returns the item at position index.
     * @param viewLayer Layer name
     * @param index Position of the item.
     * @return The item at position index.
     */
    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string;
    /**
     * Returns the string form of all layer information except part_of_speech layer.
     * @return The string form of all layer information except part_of_speech layer.
     */
    getLayerDescription(): string;
    /**
     * Returns the layer info for the given layer.
     * @param viewLayer Layer name.
     * @return Layer info for the given layer.
     */
    getLayerData(viewLayer: ViewLayerType): string;
    /**
     * Returns the layer info for the given layer, if that layer exists. Otherwise, it returns the fallback layer info
     * determined by the checkLayer.
     * @param viewLayer Layer name
     * @return Layer info for the given layer if it exists. Otherwise, it returns the fallback layer info determined by
     * the checkLayer.
     */
    getRobustLayerData(viewLayer: ViewLayerType): string;
    /**
     * Initializes the metamorphemesmoved layer with metamorpheme layer except the root word.
     */
    private updateMetaMorphemesMoved;
    /**
     * Removes the given layer from hash map.
     * @param layerType Layer to be removed.
     */
    removeLayer(layerType: ViewLayerType): void;
    /**
     * Removes metamorpheme and metamorphemesmoved layers.
     */
    metaMorphemeClear(): void;
    /**
     * Removes English layer.
     */
    englishClear(): void;
    /**
     * Removes the dependency layer.
     */
    dependencyClear(): void;
    /**
     * Removed metamorphemesmoved layer.
     */
    metaMorphemesMovedClear(): void;
    /**
     * Removes the Turkish semantic layer.
     */
    semanticClear(): void;
    /**
     * Removes the English semantic layer.
     */
    englishSemanticClear(): void;
    /**
     * Removes the morphological analysis, part of speech, metamorpheme, and metamorphemesmoved layers.
     */
    morphologicalAnalysisClear(): void;
    /**
     * Removes the metamorpheme at position index.
     * @param index Position of the metamorpheme to be removed.
     * @return Metamorphemes concatenated as a string after the removed metamorpheme.
     */
    metaMorphemeRemove(index: number): MetamorphicParse;
    /**
     * Checks if the last inflectional group contains VERB tag.
     * @return True if the last inflectional group contains VERB tag, false otherwise.
     */
    isVerbal(): boolean;
    /**
     * Checks if the last verbal inflectional group contains ZERO tag.
     * @return True if the last verbal inflectional group contains ZERO tag, false otherwise.
     */
    isNominal(): boolean;
    /**
     * Creates an array list of LayerInfo objects, where each object correspond to one word in the tree node. Turkish
     * words, morphological parses, metamorpheme parses, semantic senses, shallow parses are divided into corresponding
     * words. Named entity tags and propbank arguments are the same for all words.
     * @return An array list of LayerInfo objects created from the layer info of the node.
     */
    divideIntoWords(): Array<LayerInfo>;
    /**
     * Converts layer info of the word at position wordIndex to an AnnotatedWord. Layers are converted to their
     * counterparts in the AnnotatedWord.
     * @param wordIndex Index of the word to be converted.
     * @return Converted annotatedWord
     */
    toAnnotatedWord(wordIndex: number): AnnotatedWord;
}
