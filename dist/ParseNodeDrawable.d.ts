import { ParseNode } from "nlptoolkit-parsetree/dist/ParseNode";
import { LayerInfo } from "./LayerInfo";
import { Symbol } from "nlptoolkit-parsetree/dist/Symbol";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { Gazetteer } from "nlptoolkit-namedentityrecognition/dist/Gazetteer";
export declare class ParseNodeDrawable extends ParseNode {
    protected layers: LayerInfo;
    protected depth: number;
    protected inOrderTraversalIndex: number;
    /**
     * Constructs a ParseNodeDrawable from a single line. If the node is a leaf node, it only sets the data. Otherwise,
     * splits the line w.r.t. spaces and parenthesis and calls itself recursively to generate its child parseNodes.
     * @param parentOrLeftOrSymbol The parent node of this node.
     * @param lineOrRightOrData The input line to create this parseNode.
     * @param dataOrIsleaf True, if this node is a leaf node; false otherwise.
     * @param depth Depth of the node.
     */
    constructor(parentOrLeftOrSymbol?: any, lineOrRightOrData?: any, dataOrIsleaf?: any, depth?: number);
    /**
     * Accessor for layers attribute
     * @return Layers attribute
     */
    getLayerInfo(): LayerInfo;
    /**
     * Returns the data. Either the node is a leaf node, in which case English word layer is returned; or the node is
     * a nonleaf node, in which case the node tag is returned.
     * @return English word for leaf node, constituency tag for non-leaf node.
     */
    getData(): Symbol;
    /**
     * Clears the layers hash map.
     */
    clearLayers(): void;
    /**
     * Recursive method to clear a given layer.
     * @param layerType Name of the layer to be cleared
     */
    clearLayer(layerType: ViewLayerType): void;
    /**
     * Clears the node tag.
     */
    clearData(): void;
    /**
     * Setter for the data attribute and also clears all layers.
     * @param data New data field.
     */
    setDataAndClearLayers(data: Symbol): void;
    /**
     * Mutator for the data field. If the layers is null, its sets the data field, otherwise it sets the English layer
     * to the given value.
     * @param data Data to be set.
     */
    setData(data: Symbol): void;
    /**
     * Returns the layer value of the head child of this node.
     * @param viewLayerType Layer name
     * @return Layer value of the head child of this node.
     */
    headWord(viewLayerType: ViewLayerType): string;
    /**
     * Returns the layer value of a given layer.
     * @param viewLayer Layer name
     * @return Value of the given layer
     */
    getLayerData(viewLayer?: ViewLayerType): string;
    /**
     * Accessor for the depth attribute
     * @return Depth attribute
     */
    getDepth(): number;
    /**
     * Replaces a given old child with the given new child.
     * @param oldChild Old child to be replaced
     * @param newChild New child which replaces old child
     */
    replaceChild(oldChild: ParseNodeDrawable, newChild: ParseNodeDrawable): void;
    /**
     * Recursive method which updates the depth attribute
     * @param depth Current depth to set.
     */
    updateDepths(depth: number): void;
    /**
     * Calculates the maximum depth of the subtree rooted from this node.
     * @return The maximum depth of the subtree rooted from this node.
     */
    maxDepth(): number;
    /**
     * Recursive method that checks if all nodes in the subtree rooted with this node has the annotation in the given
     * layer.
     * @param viewLayerType Layer name
     * @return True if all nodes in the subtree rooted with this node has the annotation in the given layer, false
     * otherwise.
     */
    layerExists(viewLayerType: ViewLayerType): boolean;
    /**
     * Checks if the current node is a dummy node or not. A node is a dummy node if its data contains '*', or its
     * data is '0' and its parent is '-NONE-'.
     * @return True if the current node is a dummy node, false otherwise.
     */
    isDummyNode(): boolean;
    /**
     * Checks if all nodes in the subtree rooted with this node has annotation with the given layer.
     * @param viewLayerType Layer name
     * @return True if all nodes in the subtree rooted with this node has annotation with the given layer, false
     * otherwise.
     */
    layerAll(viewLayerType: ViewLayerType): boolean;
    /**
     * Recursive method to convert the subtree rooted with this node to a string. All parenthesis types are converted to
     * their regular forms.
     * @return String version of the subtree rooted with this node.
     */
    toTurkishSentence(): string;
    /**
     * Sets the NER layer according to the tag of the parent node and the word in the node. The word is searched in the
     * gazetteer, if it exists, the NER info is replaced with the NER tag in the gazetter.
     * @param gazetteer Gazetteer where we search the word
     * @param word Word to be searched in the gazetteer
     */
    checkGazetteer(gazetteer: Gazetteer, word: string): void;
    /**
     * Recursive method that sets the tag information of the given parse node with all descendants with respect to the
     * morphological annotation of the current node with all descendants.
     * @param parseNode Parse node whose tag information will be changed.
     * @param surfaceForm If true, tag will be replaced with the surface form annotation.
     */
    generateParseNode(parseNode: ParseNode, surfaceForm: boolean): void;
    /**
     * Recursive method to convert the subtree rooted with this node to a string.
     * @return String version of the subtree rooted with this node.
     */
    toString(): string;
}
