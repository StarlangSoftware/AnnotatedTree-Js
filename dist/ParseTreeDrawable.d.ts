import { ParseTree } from "nlptoolkit-parsetree/dist/ParseTree";
import { FileDescription } from "nlptoolkit-corpus/dist/FileDescription";
import { ParseNode } from "nlptoolkit-parsetree/dist/ParseNode";
import { ParseNodeDrawable } from "./ParseNodeDrawable";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import { AnnotatedSentence } from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
export declare class ParseTreeDrawable extends ParseTree {
    private fileDescription;
    constructor(fileDescriptionOrPath?: any, fileDescriptionOrFileName?: any, index?: number);
    setFileDescription(fileDescription: FileDescription): void;
    getFileDescription(): FileDescription;
    reload(): void;
    setRoot(newRootNode: ParseNode): void;
    readFromFile(currentPath: string): void;
    nextTree(count: number): void;
    previousTree(count: number): void;
    maxDepth(): number;
    moveLeft(node: ParseNode): void;
    moveRight(node: ParseNode): void;
    divideIntoWords(parseNode: ParseNodeDrawable): void;
    moveNode(fromNode: ParseNode, toNode: ParseNode, childIndex?: number): void;
    combineWords(parent: ParseNodeDrawable, child: ParseNodeDrawable): void;
    layerExists(viewLayerType: ViewLayerType): boolean;
    layerAll(viewLayerType: ViewLayerType): boolean;
    clearLayer(layerType: ViewLayerType): void;
    nextLeafNode(parseNode: ParseNodeDrawable): ParseNodeDrawable;
    previousLeafNode(parseNode: ParseNodeDrawable): ParseNodeDrawable;
    generateAnnotatedSentence(language?: string): AnnotatedSentence;
    generateParseTree(surfaceForm: boolean): ParseTree;
}
