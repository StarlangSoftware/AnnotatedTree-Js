import {ParseTree} from "nlptoolkit-parsetree/dist/ParseTree";
import {FileDescription} from "nlptoolkit-corpus/dist/FileDescription";
import {ParseNode} from "nlptoolkit-parsetree/dist/ParseNode";
import * as fs from "fs";
import {ParseNodeDrawable} from "./ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {Symbol} from "nlptoolkit-parsetree/dist/Symbol";
import {NodeDrawableCollector} from "./Processor/NodeDrawableCollector";
import {IsTurkishLeafNode} from "./Processor/Condition/IsTurkishLeafNode";
import {AnnotatedSentence} from "nlptoolkit-annotatedsentence/dist/AnnotatedSentence";
import {IsEnglishLeafNode} from "./Processor/Condition/IsEnglishLeafNode";
import {AnnotatedWord} from "nlptoolkit-annotatedsentence/dist/AnnotatedWord";

export class ParseTreeDrawable extends ParseTree{

    private fileDescription: FileDescription
    private name: string

    constructor(fileDescriptionOrPath?: any, fileDescriptionOrFileName?: any, index?: number) {
        super();
        if (fileDescriptionOrPath instanceof FileDescription){
            this.fileDescription = fileDescriptionOrPath
            this.readFromFile(fileDescriptionOrPath.getPath())
        } else {
            if (fileDescriptionOrFileName == undefined){
                let path: string = fileDescriptionOrPath
                this.readFromFile(path)
            } else {
                if (fileDescriptionOrFileName instanceof FileDescription){
                    let path: string = fileDescriptionOrPath
                    let fileDescription: FileDescription = fileDescriptionOrFileName
                    this.fileDescription = new FileDescription(path, fileDescription.getExtension(), fileDescription.getIndex())
                    this.readFromFile(this.fileDescription.getPath())
                } else {
                    if (index == undefined){
                        let path: string = fileDescriptionOrPath
                        let rawFileName: string = fileDescriptionOrFileName
                        this.fileDescription = new FileDescription(path, rawFileName)
                        this.readFromFile(this.fileDescription.getPath())
                    } else {
                        let path: string = fileDescriptionOrPath
                        let extension:  string = fileDescriptionOrFileName
                        this.fileDescription = new FileDescription(path, extension, index)
                        this.readFromFile(this.fileDescription.getPath())
                    }
                }
            }
        }
    }

    setFileDescription(fileDescription: FileDescription){
        this.fileDescription = fileDescription
    }

    getFileDescription(){
        return this.fileDescription
    }

    reload(){
        this.readFromFile(this.fileDescription.getPath());
    }

    setRoot(newRootNode: ParseNode){
        this.root = newRootNode
    }

    readFromFile(currentPath: string) {
        let data = fs.readFileSync(currentPath, 'utf8')
        let line = data.split("\n")[0]
        if (line.includes("(") && line.includes(")")) {
            line = line.substring(line.indexOf("(") + 1, line.lastIndexOf(")")).trim();
            this.root = new ParseNodeDrawable(null, line, false, 0);
        }
    }

    setName(name: string){
        this.name = name
    }

    nextTree(count: number){
        if (this.fileDescription.nextFileExists(count)){
            this.fileDescription.addToIndex(count);
            this.reload();
        }
    }

    previousTree(count: number){
        if (this.fileDescription.previousFileExists(count)){
            this.fileDescription.addToIndex(-count);
            this.reload();
        }
    }

    maxDepth(): number{
        return (<ParseNodeDrawable> this.root).maxDepth()
    }

    moveLeft(node: ParseNode){
        if (this.root != node){
            this.root.moveLeft(node);
        }
    }

    moveRight(node: ParseNode){
        if (this.root != node){
            this.root.moveRight(node);
        }
    }

    divideIntoWords(parseNode: ParseNodeDrawable) {
        let layers = parseNode.getLayerInfo().divideIntoWords();
        parseNode.getParent().removeChild(parseNode);
        for (let layerInfo of layers) {
            let symbol
            if (layerInfo.layerExists(ViewLayerType.INFLECTIONAL_GROUP)) {
                symbol = new Symbol(layerInfo.getMorphologicalParseAt(0).getTreePos());
            } else {
                symbol = new Symbol("-XXX-");
            }
            let child = new ParseNodeDrawable(symbol);
            parseNode.getParent().addChild(child);
            let grandChild = new ParseNodeDrawable(child, layerInfo.getLayerDescription(), true, parseNode.getDepth() + 1);
            child.addChild(grandChild);
            (<ParseNodeDrawable>this.root).updateDepths(0);
        }
    }

    moveNode(fromNode: ParseNode, toNode: ParseNode, childIndex?: number){
        if (this.root != fromNode){
            let parent = fromNode.getParent();
            parent.removeChild(fromNode);
            toNode.addChild(fromNode, childIndex);
            (<ParseNodeDrawable> this.root).updateDepths(0);
        }
    }

    combineWords(parent: ParseNodeDrawable, child: ParseNodeDrawable){
        while (parent.numberOfChildren() > 0){
            parent.removeChild(parent.firstChild());
        }
        parent.addChild(child);
        (<ParseNodeDrawable> this.root).updateDepths(0);
    }

    layerExists(viewLayerType: ViewLayerType): boolean{
        return (<ParseNodeDrawable>(this.root)).layerExists(viewLayerType);
    }

    layerAll(viewLayerType: ViewLayerType): boolean{
        return (<ParseNodeDrawable>(this.root)).layerAll(viewLayerType);
    }

    clearLayer(layerType: ViewLayerType){
        if (this.root != null){
            (<ParseNodeDrawable>this.root).clearLayer(layerType);
        }
    }

    nextLeafNode(parseNode: ParseNodeDrawable): ParseNodeDrawable {
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable>this.root, new IsTurkishLeafNode());
        let leafList = nodeDrawableCollector.collect();
        for (let i = 0; i < leafList.length - 1; i++){
            if (leafList[i] == parseNode){
                return leafList[i + 1];
            }
        }
        return null;
    }

    previousLeafNode(parseNode: ParseNodeDrawable): ParseNodeDrawable {
        let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable>this.root, new IsTurkishLeafNode());
        let leafList = nodeDrawableCollector.collect();
        for (let i = 1; i < leafList.length; i++){
            if (leafList[i] == parseNode){
                return leafList[i - 1];
            }
        }
        return null;
    }

    generateAnnotatedSentence(language?: string): AnnotatedSentence{
        if (language == undefined){
            let sentence = new AnnotatedSentence();
            let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable>this.root, new IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            for (let parseNode of leafList){
                let layers = parseNode.getLayerInfo();
                for (let i = 0; i < layers.getNumberOfWords(); i++){
                    sentence.addWord(layers.toAnnotatedWord(i));
                }
            }
            return sentence;
        } else {
            let sentence = new AnnotatedSentence();
            let nodeDrawableCollector = new NodeDrawableCollector(<ParseNodeDrawable>this.root, new IsEnglishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            for (let parseNode of leafList){
                let newWord = new AnnotatedWord("{" + language + "=" + parseNode.getData().getName() + "}{posTag="
                    + parseNode.getParent().getData().getName() + "}");
                sentence.addWord(newWord);
            }
            return sentence;
        }
    }
}