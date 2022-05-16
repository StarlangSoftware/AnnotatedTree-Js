(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-parsetree/dist/ParseTree", "nlptoolkit-corpus/dist/FileDescription", "nlptoolkit-parsetree/dist/ParseNode", "fs", "./ParseNodeDrawable", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "nlptoolkit-parsetree/dist/Symbol", "./Processor/NodeDrawableCollector", "./Processor/Condition/IsTurkishLeafNode", "nlptoolkit-annotatedsentence/dist/AnnotatedSentence", "./Processor/Condition/IsEnglishLeafNode", "nlptoolkit-annotatedsentence/dist/AnnotatedWord"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParseTreeDrawable = void 0;
    const ParseTree_1 = require("nlptoolkit-parsetree/dist/ParseTree");
    const FileDescription_1 = require("nlptoolkit-corpus/dist/FileDescription");
    const ParseNode_1 = require("nlptoolkit-parsetree/dist/ParseNode");
    const fs = require("fs");
    const ParseNodeDrawable_1 = require("./ParseNodeDrawable");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const Symbol_1 = require("nlptoolkit-parsetree/dist/Symbol");
    const NodeDrawableCollector_1 = require("./Processor/NodeDrawableCollector");
    const IsTurkishLeafNode_1 = require("./Processor/Condition/IsTurkishLeafNode");
    const AnnotatedSentence_1 = require("nlptoolkit-annotatedsentence/dist/AnnotatedSentence");
    const IsEnglishLeafNode_1 = require("./Processor/Condition/IsEnglishLeafNode");
    const AnnotatedWord_1 = require("nlptoolkit-annotatedsentence/dist/AnnotatedWord");
    class ParseTreeDrawable extends ParseTree_1.ParseTree {
        constructor(fileDescriptionOrPath, fileDescriptionOrFileName, index) {
            super();
            if (fileDescriptionOrPath instanceof FileDescription_1.FileDescription) {
                this.fileDescription = fileDescriptionOrPath;
                this.readFromFile(fileDescriptionOrPath.getPath());
            }
            else {
                if (fileDescriptionOrFileName == undefined) {
                    let path = fileDescriptionOrPath;
                    this.readFromFile(path);
                }
                else {
                    if (fileDescriptionOrFileName instanceof FileDescription_1.FileDescription) {
                        let path = fileDescriptionOrPath;
                        let fileDescription = fileDescriptionOrFileName;
                        this.fileDescription = new FileDescription_1.FileDescription(path, fileDescription.getExtension(), fileDescription.getIndex());
                        this.readFromFile(this.fileDescription.getPath());
                    }
                    else {
                        if (index == undefined) {
                            let path = fileDescriptionOrPath;
                            let rawFileName = fileDescriptionOrFileName;
                            this.fileDescription = new FileDescription_1.FileDescription(path, rawFileName);
                            this.readFromFile(this.fileDescription.getPath());
                        }
                        else {
                            let path = fileDescriptionOrPath;
                            let extension = fileDescriptionOrFileName;
                            this.fileDescription = new FileDescription_1.FileDescription(path, extension, index);
                            this.readFromFile(this.fileDescription.getPath());
                        }
                    }
                }
            }
        }
        setFileDescription(fileDescription) {
            this.fileDescription = fileDescription;
        }
        getFileDescription() {
            return this.fileDescription;
        }
        reload() {
            this.readFromFile(this.fileDescription.getPath());
        }
        setRoot(newRootNode) {
            this.root = newRootNode;
        }
        readFromFile(currentPath) {
            let data = fs.readFileSync(currentPath, 'utf8');
            let line = data.split("\n")[0];
            if (line.includes("(") && line.includes(")")) {
                line = line.substring(line.indexOf("(") + 1, line.lastIndexOf(")")).trim();
                this.root = new ParseNodeDrawable_1.ParseNodeDrawable(null, line, false, 0);
            }
        }
        nextTree(count) {
            if (this.fileDescription.nextFileExists(count)) {
                this.fileDescription.addToIndex(count);
                this.reload();
            }
        }
        previousTree(count) {
            if (this.fileDescription.previousFileExists(count)) {
                this.fileDescription.addToIndex(-count);
                this.reload();
            }
        }
        maxDepth() {
            return this.root.maxDepth();
        }
        moveLeft(node) {
            if (this.root != node) {
                this.root.moveLeft(node);
            }
        }
        moveRight(node) {
            if (this.root != node) {
                this.root.moveRight(node);
            }
        }
        divideIntoWords(parseNode) {
            let layers = parseNode.getLayerInfo().divideIntoWords();
            parseNode.getParent().removeChild(parseNode);
            for (let layerInfo of layers) {
                let symbol;
                if (layerInfo.layerExists(ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP)) {
                    symbol = new Symbol_1.Symbol(layerInfo.getMorphologicalParseAt(0).getTreePos());
                }
                else {
                    symbol = new Symbol_1.Symbol("-XXX-");
                }
                let child = new ParseNodeDrawable_1.ParseNodeDrawable(symbol);
                parseNode.getParent().addChild(child);
                let grandChild = new ParseNodeDrawable_1.ParseNodeDrawable(child, layerInfo.getLayerDescription(), true, parseNode.getDepth() + 1);
                child.addChild(grandChild);
                this.root.updateDepths(0);
            }
        }
        moveNode(fromNode, toNode, childIndex) {
            if (this.root != fromNode) {
                let parent = fromNode.getParent();
                parent.removeChild(fromNode);
                toNode.addChild(fromNode, childIndex);
                this.root.updateDepths(0);
            }
        }
        combineWords(parent, child) {
            while (parent.numberOfChildren() > 0) {
                parent.removeChild(parent.firstChild());
            }
            parent.addChild(child);
            this.root.updateDepths(0);
        }
        layerExists(viewLayerType) {
            return (this.root).layerExists(viewLayerType);
        }
        layerAll(viewLayerType) {
            return (this.root).layerAll(viewLayerType);
        }
        clearLayer(layerType) {
            if (this.root != null) {
                this.root.clearLayer(layerType);
            }
        }
        nextLeafNode(parseNode) {
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(this.root, new IsTurkishLeafNode_1.IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            for (let i = 0; i < leafList.length - 1; i++) {
                if (leafList[i] == parseNode) {
                    return leafList[i + 1];
                }
            }
            return null;
        }
        previousLeafNode(parseNode) {
            let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(this.root, new IsTurkishLeafNode_1.IsTurkishLeafNode());
            let leafList = nodeDrawableCollector.collect();
            for (let i = 1; i < leafList.length; i++) {
                if (leafList[i] == parseNode) {
                    return leafList[i - 1];
                }
            }
            return null;
        }
        generateAnnotatedSentence(language) {
            if (language == undefined) {
                let sentence = new AnnotatedSentence_1.AnnotatedSentence();
                let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(this.root, new IsTurkishLeafNode_1.IsTurkishLeafNode());
                let leafList = nodeDrawableCollector.collect();
                for (let parseNode of leafList) {
                    let layers = parseNode.getLayerInfo();
                    for (let i = 0; i < layers.getNumberOfWords(); i++) {
                        sentence.addWord(layers.toAnnotatedWord(i));
                    }
                }
                return sentence;
            }
            else {
                let sentence = new AnnotatedSentence_1.AnnotatedSentence();
                let nodeDrawableCollector = new NodeDrawableCollector_1.NodeDrawableCollector(this.root, new IsEnglishLeafNode_1.IsEnglishLeafNode());
                let leafList = nodeDrawableCollector.collect();
                for (let parseNode of leafList) {
                    let newWord = new AnnotatedWord_1.AnnotatedWord("{" + language + "=" + parseNode.getData().getName() + "}{posTag="
                        + parseNode.getParent().getData().getName() + "}");
                    sentence.addWord(newWord);
                }
                return sentence;
            }
        }
        generateParseTree(surfaceForm) {
            let rootNode = this.root;
            let result = new ParseTree_1.ParseTree(new ParseNode_1.ParseNode(rootNode.getData()));
            rootNode.generateParseNode(result.getRoot(), surfaceForm);
            return result;
        }
    }
    exports.ParseTreeDrawable = ParseTreeDrawable;
});
//# sourceMappingURL=ParseTreeDrawable.js.map