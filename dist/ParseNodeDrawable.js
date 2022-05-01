(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-parsetree/dist/ParseNode", "./LayerInfo", "nlptoolkit-parsetree/dist/Symbol", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ParseNodeDrawable = void 0;
    const ParseNode_1 = require("nlptoolkit-parsetree/dist/ParseNode");
    const LayerInfo_1 = require("./LayerInfo");
    const Symbol_1 = require("nlptoolkit-parsetree/dist/Symbol");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    class ParseNodeDrawable extends ParseNode_1.ParseNode {
        constructor(parentOrLeftOrSymbol, lineOrRightOrData, dataOrIsleaf, depth) {
            super();
            this.layers = null;
            if (parentOrLeftOrSymbol == null || lineOrRightOrData != undefined) {
                let parent = parentOrLeftOrSymbol;
                if (depth != undefined) {
                    let line = lineOrRightOrData;
                    let isLeaf = dataOrIsleaf;
                    let parenthesisCount = 0;
                    let childLine = "";
                    this.depth = depth;
                    this.parent = parent;
                    if (isLeaf) {
                        if (!line.includes("{")) {
                            this.data = new Symbol_1.Symbol(line);
                        }
                        else {
                            this.layers = new LayerInfo_1.LayerInfo(line);
                        }
                    }
                    else {
                        let startPos = line.indexOf(" ");
                        this.data = new Symbol_1.Symbol(line.substring(1, startPos));
                        if (line.indexOf(")") == line.lastIndexOf(")")) {
                            this.children.push(new ParseNodeDrawable(this, line.substring(startPos + 1, line.indexOf(")")), true, depth + 1));
                        }
                        else {
                            for (let i = startPos + 1; i < line.length; i++) {
                                if (line[i] != ' ' || parenthesisCount > 0) {
                                    childLine = childLine + line[i];
                                }
                                if (line.charAt(i) == '(') {
                                    parenthesisCount++;
                                }
                                else {
                                    if (line.charAt(i) == ')') {
                                        parenthesisCount--;
                                    }
                                }
                                if (parenthesisCount == 0 && childLine != "") {
                                    this.children.push(new ParseNodeDrawable(this, childLine.trim(), false, depth + 1));
                                    childLine = "";
                                }
                            }
                        }
                    }
                }
                else {
                    let child = lineOrRightOrData;
                    let symbol = dataOrIsleaf;
                    this.depth = child.depth;
                    child.updateDepths(this.depth + 1);
                    this.parent = parent;
                    this.parent.setChild(parent.getChildIndex(child), this);
                    this.children.push(child);
                    child.parent = this;
                    this.data = new Symbol_1.Symbol(symbol);
                    this.inOrderTraversalIndex = child.inOrderTraversalIndex;
                }
            }
        }
        getLayerInfo() {
            return this.layers;
        }
        getData() {
            if (this.layers == null) {
                return super.getData();
            }
            else {
                return new Symbol_1.Symbol(this.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD));
            }
        }
        clearLayers() {
            this.layers = new LayerInfo_1.LayerInfo();
        }
        clearLayer(layerType) {
            if (this.children.length == 0 && this.layerExists(layerType)) {
                this.layers.removeLayer(layerType);
            }
            for (let i = 0; i < this.numberOfChildren(); i++) {
                this.children[i].clearLayer(layerType);
            }
        }
        clearData() {
            this.data = null;
        }
        setDataAndClearLayers(data) {
            super.setData(data);
            this.layers = null;
        }
        setData(data) {
            if (this.layers == null) {
                super.setData(data);
            }
            else {
                this.layers.setLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD, data.getName());
            }
        }
        headWord(viewLayerType) {
            if (this.children.length > 0) {
                return this.headChild().headWord(viewLayerType);
            }
            else {
                return this.getLayerData(viewLayerType);
            }
        }
        getLayerData(viewLayer) {
            if (viewLayer == undefined) {
                if (this.data != null) {
                    return this.data.getName();
                }
                return this.layers.getLayerDescription();
            }
            else {
                if (viewLayer == ViewLayerType_1.ViewLayerType.WORD || this.layers == null) {
                    return this.data.getName();
                }
                return this.layers.getLayerData(viewLayer);
            }
        }
        getDepth() {
            return this.depth;
        }
        replaceChild(oldChild, newChild) {
            newChild.updateDepths(this.depth + 1);
            newChild.parent = this;
            this.children[this.children.indexOf(oldChild)] = newChild;
        }
        updateDepths(depth) {
            this.depth = depth;
            for (let aChildren of this.children) {
                let aChild = aChildren;
                aChild.updateDepths(depth + 1);
            }
        }
        maxDepth() {
            let depth = this.depth;
            for (let aChildren of this.children) {
                let aChild = aChildren;
                if (aChild.maxDepth() > depth)
                    depth = aChild.maxDepth();
            }
            return depth;
        }
        layerExists(viewLayerType) {
            if (this.children.length == 0) {
                if (this.getLayerData(viewLayerType) != null) {
                    return true;
                }
            }
            else {
                for (let aChild of this.children) {
                    if (aChild.layerExists(viewLayerType)) {
                        return true;
                    }
                }
            }
            return false;
        }
        isDummyNode() {
            let data = this.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD);
            let parentData = this.parent.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD);
            let targetData = this.getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD);
            if (data != null && parentData != null) {
                if (targetData != null && targetData.includes("*")) {
                    return true;
                }
                return data.includes("*") || (data == "0" && parentData == "-NONE-");
            }
            else {
                return false;
            }
        }
        layerAll(viewLayerType) {
            if (this.children.length == 0) {
                if (this.getLayerData(viewLayerType) == null && !this.isDummyNode()) {
                    return false;
                }
            }
            else {
                for (let aChild of this.children) {
                    if (!aChild.layerAll(viewLayerType)) {
                        return false;
                    }
                }
            }
            return true;
        }
        toTurkishSentence() {
            if (this.children.length == 0) {
                if (this.getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD) != null && this.getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD) != "*NONE*") {
                    return " " + this.getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD)
                        .replace("-LRB-", "(")
                        .replace("-RRB-", ")")
                        .replace("-LSB-", "[")
                        .replace("-RSB-", "]")
                        .replace("-LCB-", "{")
                        .replace("-RCB-", "}")
                        .replace("-lrb-", "(")
                        .replace("-rrb-", ")")
                        .replace("-lsb-", "[")
                        .replace("-rsb-", "]")
                        .replace("-lcb-", "{")
                        .replace("-rcb-", "}");
                }
                else {
                    return " ";
                }
            }
            else {
                let st = "";
                for (let aChild of this.children) {
                    st = st + aChild.toTurkishSentence();
                }
                return st;
            }
        }
        checkGazetteer(gazetteer, word) {
            if (gazetteer.contains(word) && this.getParent().getData().getName() == "NNP") {
                this.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.NER, gazetteer.getName());
            }
            if (word.includes("'") && gazetteer.contains(word.substring(0, word.indexOf("'"))) && this.getParent().getData().getName() == "NNP") {
                this.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.NER, gazetteer.getName());
            }
        }
        generateParseNode(parseNode, surfaceForm) {
            if (this.numberOfChildren() == 0) {
                if (surfaceForm) {
                    parseNode.setData(new Symbol_1.Symbol(this.getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD)));
                }
                else {
                    parseNode.setData(new Symbol_1.Symbol(this.getLayerInfo().getMorphologicalParseAt(0).getWord().getName()));
                }
            }
            else {
                parseNode.setData(this.data);
                for (let i = 0; i < this.numberOfChildren(); i++) {
                    let newChild = new ParseNode_1.ParseNode();
                    parseNode.addChild(newChild);
                    this.children[i].generateParseNode(newChild, surfaceForm);
                }
            }
        }
        toString() {
            if (this.children.length < 2) {
                if (this.children.length < 1) {
                    return this.getLayerData();
                }
                else {
                    return "(" + this.data.getName() + " " + this.children[0].toString() + ")";
                }
            }
            else {
                let st = "(" + this.data.getName();
                for (let aChild of this.children) {
                    st = st + " " + aChild.toString();
                }
                return st + ") ";
            }
        }
    }
    exports.ParseNodeDrawable = ParseNodeDrawable;
});
//# sourceMappingURL=ParseNodeDrawable.js.map