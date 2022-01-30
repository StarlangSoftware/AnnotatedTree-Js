import {ParseNode} from "nlptoolkit-parsetree/dist/ParseNode";
import {LayerInfo} from "./LayerInfo";
import {Symbol} from "nlptoolkit-parsetree/dist/Symbol";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {Gazetteer} from "nlptoolkit-namedentityrecognition/dist/Gazetteer";

export class ParseNodeDrawable extends ParseNode{

    protected layers: LayerInfo = null
    protected depth: number
    protected inOrderTraversalIndex: number

    constructor(parentOrLeftOrSymbol?: any, lineOrRightOrData?: any, dataOrIsleaf?: any, depth?: number) {
        super();
        if (parentOrLeftOrSymbol == null || lineOrRightOrData != undefined){
            let parent: ParseNodeDrawable = parentOrLeftOrSymbol
            if (depth != undefined){
                let line: string = lineOrRightOrData
                let isLeaf: boolean = dataOrIsleaf
                let parenthesisCount = 0;
                let childLine = "";
                this.depth = depth;
                this.parent = parent;
                if (isLeaf){
                    if (!line.includes("{")){
                        this.data = new Symbol(line);
                    } else {
                        this.layers = new LayerInfo(line);
                    }
                } else {
                    let startPos = line.indexOf(" ");
                    this.data = new Symbol(line.substring(1, startPos));
                    if (line.indexOf(")") == line.lastIndexOf(")")){
                        this.children.push(new ParseNodeDrawable(this, line.substring(startPos + 1, line.indexOf(")")), true, depth + 1));
                    } else {
                        for (let i = startPos + 1; i < line.length; i++){
                            if (line[i] != ' ' || parenthesisCount > 0){
                                childLine = childLine + line[i];
                            }
                            if (line.charAt(i) == '('){
                                parenthesisCount++;
                            } else {
                                if (line.charAt(i) == ')'){
                                    parenthesisCount--;
                                }
                            }
                            if (parenthesisCount == 0 && childLine != ""){
                                this.children.push(new ParseNodeDrawable(this, childLine.trim(), false, depth + 1));
                                childLine = "";
                            }
                        }
                    }
                }
            } else {
                let child: ParseNodeDrawable = lineOrRightOrData
                let symbol: string = dataOrIsleaf
                this.depth = child.depth;
                child.updateDepths(this.depth + 1);
                this.parent = parent;
                this.parent.setChild(parent.getChildIndex(child), this);
                this.children.push(child);
                child.parent = this;
                this.data = new Symbol(symbol);
                this.inOrderTraversalIndex = child.inOrderTraversalIndex;
            }
        }
    }

    getLayerInfo(): LayerInfo{
        return this.layers
    }

    getData(): Symbol{
        if (this.layers == null){
            return super.getData()
        } else {
            return new Symbol(this.getLayerData(ViewLayerType.ENGLISH_WORD));
        }
    }

    clearLayers(){
        this.layers = new LayerInfo()
    }

    clearLayer(layerType: ViewLayerType){
        if (this.children.length == 0 && this.layerExists(layerType)){
            this.layers.removeLayer(layerType)
        }
        for (let i = 0; i < this.numberOfChildren(); i++){
            (<ParseNodeDrawable> this.children[i]).clearLayer(layerType);
        }
    }

    clearData(){
        this.data = null
    }

    setDataAndClearLayers(data: Symbol){
        super.setData(data)
        this.layers = null
    }

    setData(data: Symbol) {
        if (this.layers == null){
            super.setData(data);
        } else {
            this.layers.setLayerData(ViewLayerType.ENGLISH_WORD, data.getName());
        }
    }

    headWord(viewLayerType: ViewLayerType): string{
        if (this.children.length > 0){
            return (<ParseNodeDrawable> this.headChild()).headWord(viewLayerType);
        } else {
            return this.getLayerData(viewLayerType);
        }
    }

    getLayerData(viewLayer?: ViewLayerType): string{
        if (viewLayer == undefined){
            if (this.data != null){
                return this.data.getName();
            }
            return this.layers.getLayerDescription();
        } else {
            if (viewLayer == ViewLayerType.WORD || this.layers == null){
                return this.data.getName();
            }
            return this.layers.getLayerData(viewLayer);
        }
    }

    getDepth(): number{
        return this.depth
    }

    replaceChild(oldChild: ParseNodeDrawable, newChild: ParseNodeDrawable){
        newChild.updateDepths(this.depth + 1);
        newChild.parent = this;
        this.children[this.children.indexOf(oldChild)] = newChild;
    }

    updateDepths(depth: number){
        this.depth = depth;
        for (let aChildren of this.children){
            let aChild = <ParseNodeDrawable> aChildren;
            aChild.updateDepths(depth + 1);
        }
    }

    maxDepth(): number{
        let depth = this.depth;
        for (let aChildren of this.children) {
            let aChild = <ParseNodeDrawable> aChildren;
            if (aChild.maxDepth() > depth)
                depth = aChild.maxDepth();
        }
        return depth;
    }

    layerExists(viewLayerType: ViewLayerType): boolean{
        if (this.children.length == 0){
            if (this.getLayerData(viewLayerType) != null){
                return true;
            }
        } else {
            for (let aChild of this.children) {
                if ((<ParseNodeDrawable>aChild).layerExists(viewLayerType)){
                    return true;
                }
            }
        }
        return false;
    }

    isDummyNode(): boolean {
        let data = this.getLayerData(ViewLayerType.ENGLISH_WORD);
        let parentData = (<ParseNodeDrawable> this.parent).getLayerData(ViewLayerType.ENGLISH_WORD);
        let targetData = this.getLayerData(ViewLayerType.TURKISH_WORD);
        if (data != null && parentData != null){
            if (targetData != null && targetData.includes("*")){
                return true;
            }
            return data.includes("*") || (data == "0" && parentData == "-NONE-");
        } else {
            return false;
        }
    }

    layerAll(viewLayerType: ViewLayerType): boolean{
        if (this.children.length == 0){
            if (this.getLayerData(viewLayerType) == null && !this.isDummyNode()){
                return false;
            }
        } else {
            for (let aChild of this.children) {
                if (!(<ParseNodeDrawable> aChild).layerAll(viewLayerType)){
                    return false;
                }
            }
        }
        return true;
    }

    toTurkishSentence(): string{
        if (this.children.length == 0){
            if (this.getLayerData(ViewLayerType.TURKISH_WORD) != null && this.getLayerData(ViewLayerType.TURKISH_WORD) != "*NONE*"){
                return " " + this.getLayerData(ViewLayerType.TURKISH_WORD)
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
            } else {
                return " ";
            }
        } else {
            let st = "";
            for (let aChild of this.children) {
                st = st + (<ParseNodeDrawable> aChild).toTurkishSentence();
            }
            return st;
        }
    }

    checkGazetteer(gazetteer: Gazetteer, word: string){
        if (gazetteer.contains(word) && this.getParent().getData().getName() == "NNP"){
            this.getLayerInfo().setLayerData(ViewLayerType.NER, gazetteer.getName());
        }
        if (word.includes("'") && gazetteer.contains(word.substring(0, word.indexOf("'"))) && this.getParent().getData().getName() == "NNP"){
            this.getLayerInfo().setLayerData(ViewLayerType.NER, gazetteer.getName());
        }
    }

    toString(): string{
        if (this.children.length < 2){
            if (this.children.length < 1){
                return this.getLayerData();
            } else {
                return "(" + this.data.getName() + " " + this.children[0].toString() + ")";
            }
        } else {
            let st = "(" + this.data.getName();
            for (let aChild of this.children) {
                st = st + " " + aChild.toString();
            }
            return st + ") ";
        }
    }
}