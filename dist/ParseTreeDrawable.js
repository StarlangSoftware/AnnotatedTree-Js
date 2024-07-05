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
                this.constructor1(fileDescriptionOrPath);
            }
            else {
                if (fileDescriptionOrFileName == undefined) {
                    this.constructor2(fileDescriptionOrPath);
                }
                else {
                    if (fileDescriptionOrFileName instanceof FileDescription_1.FileDescription) {
                        this.constructor3(fileDescriptionOrPath, fileDescriptionOrFileName);
                    }
                    else {
                        if (index == undefined) {
                            this.constructor4(fileDescriptionOrPath, fileDescriptionOrFileName);
                        }
                        else {
                            this.constructor5(fileDescriptionOrPath, fileDescriptionOrFileName, index);
                        }
                    }
                }
            }
        }
        /**
         * Another constructor for the ParseTreeDrawable. Sets the file description and reads the tree from the file
         * description.
         * @param fileDescription File description that contains the path, index and extension information.
         */
        constructor1(fileDescription) {
            this.fileDescription = fileDescription;
            this.readFromFile(fileDescription.getPath());
        }
        /**
         * Another constructor for the ParseTreeDrawable. Sets the file description and reads the tree from the file
         * description.
         * @param path Path of the tree
         */
        constructor2(path) {
            this.readFromFile(path);
        }
        /**
         * Another constructor for the ParseTreeDrawable. Sets the file description and reads the tree from the file
         * description.
         * @param path Path of the tree
         * @param fileDescription File description that contains the path, index and extension information.
         */
        constructor3(path, fileDescription) {
            this.fileDescription = new FileDescription_1.FileDescription(path, fileDescription.getExtension(), fileDescription.getIndex());
            this.readFromFile(this.fileDescription.getPath());
        }
        /**
         * Constructor for the ParseTreeDrawable. Sets the file description and reads the tree from the file description.
         * @param path Path of the tree
         * @param rawFileName File name of the tree such as 0123.train.
         */
        constructor4(path, rawFileName) {
            this.fileDescription = new FileDescription_1.FileDescription(path, rawFileName);
            this.readFromFile(this.fileDescription.getPath());
        }
        /**
         * Another constructor for the ParseTreeDrawable. Sets the file description and reads the tree from the file
         * description.
         * @param path Path of the tree
         * @param extension Extension of the file such as train, test or dev.
         * @param index Index of the file such as 1235.
         */
        constructor5(path, extension, index) {
            this.fileDescription = new FileDescription_1.FileDescription(path, extension, index);
            this.readFromFile(this.fileDescription.getPath());
        }
        /**
         * Mutator method for the fileDescription attribute.
         * @param fileDescription New fileDescription value.
         */
        setFileDescription(fileDescription) {
            this.fileDescription = fileDescription;
        }
        /**
         * Accessor method for the fileDescription attribute.
         * @return FileDescription attribute.
         */
        getFileDescription() {
            return this.fileDescription;
        }
        /**
         * Reloads the tree from the input file.
         */
        reload() {
            this.readFromFile(this.fileDescription.getPath());
        }
        /**
         * Mutator for the root attribute.
         * @param newRootNode New root node.
         */
        setRoot(newRootNode) {
            this.root = newRootNode;
        }
        /**
         * Reads the parse tree from the given file description with path replaced with the currentPath. It sets the root
         * node which calls ParseNodeDrawable constructor recursively.
         * @param currentPath Path of the tree
         */
        readFromFile(currentPath) {
            let data = fs.readFileSync(currentPath, 'utf8');
            let line = data.split("\n")[0];
            if (line.includes("(") && line.includes(")")) {
                line = line.substring(line.indexOf("(") + 1, line.lastIndexOf(")")).trim();
                this.root = new ParseNodeDrawable_1.ParseNodeDrawable(null, line, false, 0);
            }
        }
        /**
         * Loads the next tree according to the index of the parse tree. For example, if the current
         * tree fileName is 0123.train, after the call of nextTree(3), the method will load 0126.train. If the next tree
         * does not exist, nothing will happen.
         * @param count Number of trees to go forward
         */
        nextTree(count) {
            if (this.fileDescription.nextFileExists(count)) {
                this.fileDescription.addToIndex(count);
                this.reload();
            }
        }
        /**
         * Loads the previous tree according to the index of the parse tree. For example, if the current
         * tree fileName is 0123.train, after the call of previousTree(4), the method will load 0119.train. If the
         * previous tree does not exist, nothing will happen.
         * @param count Number of trees to go backward
         */
        previousTree(count) {
            if (this.fileDescription.previousFileExists(count)) {
                this.fileDescription.addToIndex(-count);
                this.reload();
            }
        }
        /**
         * Calculates the maximum depth of the tree.
         * @return The maximum depth of the tree.
         */
        maxDepth() {
            return this.root.maxDepth();
        }
        /**
         * Swaps the given child node of this node with the previous sibling of that given node. If the given node is the
         * leftmost child, it swaps with the last node.
         * @param node Node to be swapped.
         */
        moveLeft(node) {
            if (this.root != node) {
                this.root.moveLeft(node);
            }
        }
        /**
         * Swaps the given child node of this node with the next sibling of that given node. If the given node is the
         * rightmost child, it swaps with the first node.
         * @param node Node to be swapped.
         */
        moveRight(node) {
            if (this.root != node) {
                this.root.moveRight(node);
            }
        }
        /**
         * Divides the given node into multiple parse nodes if it contains more than one word. The parent node will be
         * the same for the new nodes, original node is deleted from the children, the pos tags of the new parse nodes will
         * be determined according to their morphological parses.
         * @param parseNode Parse node to be divided
         */
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
        /**
         * Moves the subtree rooted at fromNode as a child to the node toNode at position childIndex.
         * @param fromNode Subtree root node to be moved.
         * @param toNode Node to which a new subtree will be added.
         * @param childIndex New child index of the toNode.
         */
        moveNode(fromNode, toNode, childIndex) {
            if (this.root != fromNode) {
                let parent = fromNode.getParent();
                parent.removeChild(fromNode);
                toNode.addChild(fromNode, childIndex);
                this.root.updateDepths(0);
            }
        }
        /**
         * Removed the first child of the parent node and adds the given child node as a child to that node.
         * @param parent Parent node.
         * @param child New child node to be added.
         */
        combineWords(parent, child) {
            while (parent.numberOfChildren() > 0) {
                parent.removeChild(parent.firstChild());
            }
            parent.addChild(child);
            this.root.updateDepths(0);
        }
        /**
         * The method checks if all nodes in the tree has the annotation in the given layer.
         * @param viewLayerType Layer name
         * @return True if all nodes in the tree has the annotation in the given layer, false otherwise.
         */
        layerExists(viewLayerType) {
            return (this.root).layerExists(viewLayerType);
        }
        /**
         * Checks if all nodes in the tree has annotation with the given layer.
         * @param viewLayerType Layer name
         * @return True if all nodes in the tree has annotation with the given layer, false otherwise.
         */
        layerAll(viewLayerType) {
            return (this.root).layerAll(viewLayerType);
        }
        /**
         * Clears the given layer for all nodes in the tree
         * @param layerType Layer name
         */
        clearLayer(layerType) {
            if (this.root != null) {
                this.root.clearLayer(layerType);
            }
        }
        /**
         * Returns the leaf node that comes one after the given parse node according to the inorder traversal.
         * @param parseNode Input parse node.
         * @return The leaf node that comes one after the given parse node according to the inorder traversal.
         */
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
        /**
         * Returns the leaf node that comes one before the given parse node according to the inorder traversal.
         * @param parseNode Input parse node.
         * @return The leaf node that comes one before the given parse node according to the inorder traversal.
         */
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
        /**
         * Constructs an AnnotatedSentence object from the Turkish tree. Collects all leaf nodes, then for each leaf node
         * converts layer info of all words at that node to AnnotatedWords. Layers are converted to the counterparts in the
         * AnnotatedWord.
         * @return AnnotatedSentence counterpart of the Turkish tree
         */
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
        /**
         * Recursive method that generates a new parse tree by replacing the tag information of the all parse nodes (with all
         * its descendants) with respect to the morphological annotation of all parse nodes (with all its descendants)
         * of the current parse tree.
         * @param surfaceForm If true, tag will be replaced with the surface form annotation.
         * @return A new parse tree by replacing the tag information of the all parse nodes with respect to the
         * morphological annotation of all parse nodes of the current parse tree.
         */
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