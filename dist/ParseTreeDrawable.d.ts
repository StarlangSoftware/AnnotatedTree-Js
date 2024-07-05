import { ParseTree } from "nlptoolkit-parsetree/dist/ParseTree";
import { FileDescription } from "nlptoolkit-corpus/dist/FileDescription";
import { ParseNode } from "nlptoolkit-parsetree/dist/ParseNode";
import { ParseNodeDrawable } from "./ParseNodeDrawable";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
export declare class ParseTreeDrawable extends ParseTree {
    private fileDescription;
    /**
     * Another constructor for the ParseTreeDrawable. Sets the file description and reads the tree from the file
     * description.
     * @param fileDescription File description that contains the path, index and extension information.
     */
    constructor1(fileDescription: FileDescription): void;
    /**
     * Another constructor for the ParseTreeDrawable. Sets the file description and reads the tree from the file
     * description.
     * @param path Path of the tree
     */
    constructor2(path: string): void;
    /**
     * Another constructor for the ParseTreeDrawable. Sets the file description and reads the tree from the file
     * description.
     * @param path Path of the tree
     * @param fileDescription File description that contains the path, index and extension information.
     */
    constructor3(path: string, fileDescription: FileDescription): void;
    /**
     * Constructor for the ParseTreeDrawable. Sets the file description and reads the tree from the file description.
     * @param path Path of the tree
     * @param rawFileName File name of the tree such as 0123.train.
     */
    constructor4(path: string, rawFileName: string): void;
    /**
     * Another constructor for the ParseTreeDrawable. Sets the file description and reads the tree from the file
     * description.
     * @param path Path of the tree
     * @param extension Extension of the file such as train, test or dev.
     * @param index Index of the file such as 1235.
     */
    constructor5(path: string, extension: string, index: number): void;
    constructor(fileDescriptionOrPath?: any, fileDescriptionOrFileName?: any, index?: number);
    /**
     * Mutator method for the fileDescription attribute.
     * @param fileDescription New fileDescription value.
     */
    setFileDescription(fileDescription: FileDescription): void;
    /**
     * Accessor method for the fileDescription attribute.
     * @return FileDescription attribute.
     */
    getFileDescription(): FileDescription;
    /**
     * Reloads the tree from the input file.
     */
    reload(): void;
    /**
     * Mutator for the root attribute.
     * @param newRootNode New root node.
     */
    setRoot(newRootNode: ParseNode): void;
    /**
     * Reads the parse tree from the given file description with path replaced with the currentPath. It sets the root
     * node which calls ParseNodeDrawable constructor recursively.
     * @param currentPath Path of the tree
     */
    readFromFile(currentPath: string): void;
    /**
     * Loads the next tree according to the index of the parse tree. For example, if the current
     * tree fileName is 0123.train, after the call of nextTree(3), the method will load 0126.train. If the next tree
     * does not exist, nothing will happen.
     * @param count Number of trees to go forward
     */
    nextTree(count: number): void;
    /**
     * Loads the previous tree according to the index of the parse tree. For example, if the current
     * tree fileName is 0123.train, after the call of previousTree(4), the method will load 0119.train. If the
     * previous tree does not exist, nothing will happen.
     * @param count Number of trees to go backward
     */
    previousTree(count: number): void;
    /**
     * Calculates the maximum depth of the tree.
     * @return The maximum depth of the tree.
     */
    maxDepth(): number;
    /**
     * Swaps the given child node of this node with the previous sibling of that given node. If the given node is the
     * leftmost child, it swaps with the last node.
     * @param node Node to be swapped.
     */
    moveLeft(node: ParseNode): void;
    /**
     * Swaps the given child node of this node with the next sibling of that given node. If the given node is the
     * rightmost child, it swaps with the first node.
     * @param node Node to be swapped.
     */
    moveRight(node: ParseNode): void;
    /**
     * Divides the given node into multiple parse nodes if it contains more than one word. The parent node will be
     * the same for the new nodes, original node is deleted from the children, the pos tags of the new parse nodes will
     * be determined according to their morphological parses.
     * @param parseNode Parse node to be divided
     */
    divideIntoWords(parseNode: ParseNodeDrawable): void;
    /**
     * Moves the subtree rooted at fromNode as a child to the node toNode at position childIndex.
     * @param fromNode Subtree root node to be moved.
     * @param toNode Node to which a new subtree will be added.
     * @param childIndex New child index of the toNode.
     */
    moveNode(fromNode: ParseNode, toNode: ParseNode, childIndex?: number): void;
    /**
     * Removed the first child of the parent node and adds the given child node as a child to that node.
     * @param parent Parent node.
     * @param child New child node to be added.
     */
    combineWords(parent: ParseNodeDrawable, child: ParseNodeDrawable): void;
    /**
     * The method checks if all nodes in the tree has the annotation in the given layer.
     * @param viewLayerType Layer name
     * @return True if all nodes in the tree has the annotation in the given layer, false otherwise.
     */
    layerExists(viewLayerType: ViewLayerType): boolean;
    /**
     * Checks if all nodes in the tree has annotation with the given layer.
     * @param viewLayerType Layer name
     * @return True if all nodes in the tree has annotation with the given layer, false otherwise.
     */
    layerAll(viewLayerType: ViewLayerType): boolean;
    /**
     * Clears the given layer for all nodes in the tree
     * @param layerType Layer name
     */
    clearLayer(layerType: ViewLayerType): void;
    /**
     * Returns the leaf node that comes one after the given parse node according to the inorder traversal.
     * @param parseNode Input parse node.
     * @return The leaf node that comes one after the given parse node according to the inorder traversal.
     */
    nextLeafNode(parseNode: ParseNodeDrawable): ParseNodeDrawable;
    /**
     * Returns the leaf node that comes one before the given parse node according to the inorder traversal.
     * @param parseNode Input parse node.
     * @return The leaf node that comes one before the given parse node according to the inorder traversal.
     */
    previousLeafNode(parseNode: ParseNodeDrawable): ParseNodeDrawable;
    /**
     * Constructs an AnnotatedSentence object from the Turkish tree. Collects all leaf nodes, then for each leaf node
     * converts layer info of all words at that node to AnnotatedWords. Layers are converted to the counterparts in the
     * AnnotatedWord.
     * @return AnnotatedSentence counterpart of the Turkish tree
     */
    generateAnnotatedSentence(language?: string): AnnotatedSentence;
    /**
     * Recursive method that generates a new parse tree by replacing the tag information of the all parse nodes (with all
     * its descendants) with respect to the morphological annotation of all parse nodes (with all its descendants)
     * of the current parse tree.
     * @param surfaceForm If true, tag will be replaced with the surface form annotation.
     * @return A new parse tree by replacing the tag information of the all parse nodes with respect to the
     * morphological annotation of all parse nodes of the current parse tree.
     */
    generateParseTree(surfaceForm: boolean): ParseTree;
}
