import {ParseNode} from "nlptoolkit-parsetree/dist/ParseNode";
import {LayerInfo} from "./LayerInfo";
import {Symbol} from "nlptoolkit-parsetree/dist/Symbol";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {Gazetteer} from "nlptoolkit-namedentityrecognition/dist/Gazetteer";

export class ParseNodeDrawable extends ParseNode{

    protected layers: LayerInfo = null
    protected depth: number
    protected inOrderTraversalIndex: number

    /**
     * Constructs a ParseNodeDrawable from a single line. If the node is a leaf node, it only sets the data. Otherwise,
     * splits the line w.r.t. spaces and parenthesis and calls itself recursively to generate its child parseNodes.
     * @param parentOrLeftOrSymbol The parent node of this node.
     * @param lineOrRightOrData The input line to create this parseNode.
     * @param dataOrIsleaf True, if this node is a leaf node; false otherwise.
     * @param depth Depth of the node.
     */
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

    /**
     * Accessor for layers attribute
     * @return Layers attribute
     */
    getLayerInfo(): LayerInfo{
        return this.layers
    }

    /**
     * Returns the data. Either the node is a leaf node, in which case English word layer is returned; or the node is
     * a nonleaf node, in which case the node tag is returned.
     * @return English word for leaf node, constituency tag for non-leaf node.
     */
    getData(): Symbol{
        if (this.layers == null){
            return super.getData()
        } else {
            return new Symbol(this.getLayerData(ViewLayerType.ENGLISH_WORD));
        }
    }

    /**
     * Clears the layers hash map.
     */
    clearLayers(){
        this.layers = new LayerInfo()
    }

    /**
     * Recursive method to clear a given layer.
     * @param layerType Name of the layer to be cleared
     */
    clearLayer(layerType: ViewLayerType){
        if (this.children.length == 0 && this.layerExists(layerType)){
            this.layers.removeLayer(layerType)
        }
        for (let i = 0; i < this.numberOfChildren(); i++){
            (<ParseNodeDrawable> this.children[i]).clearLayer(layerType);
        }
    }

    /**
     * Clears the node tag.
     */
    clearData(){
        this.data = null
    }

    /**
     * Setter for the data attribute and also clears all layers.
     * @param data New data field.
     */
    setDataAndClearLayers(data: Symbol){
        super.setData(data)
        this.layers = null
    }

    /**
     * Mutator for the data field. If the layers is null, its sets the data field, otherwise it sets the English layer
     * to the given value.
     * @param data Data to be set.
     */
    setData(data: Symbol) {
        if (this.layers == null){
            super.setData(data);
        } else {
            this.layers.setLayerData(ViewLayerType.ENGLISH_WORD, data.getName());
        }
    }

    /**
     * Returns the layer value of the head child of this node.
     * @param viewLayerType Layer name
     * @return Layer value of the head child of this node.
     */
    headWord(viewLayerType: ViewLayerType): string{
        if (this.children.length > 0){
            return (<ParseNodeDrawable> this.headChild()).headWord(viewLayerType);
        } else {
            return this.getLayerData(viewLayerType);
        }
    }

    /**
     * Returns the layer value of a given layer.
     * @param viewLayer Layer name
     * @return Value of the given layer
     */
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

    /**
     * Accessor for the depth attribute
     * @return Depth attribute
     */
    getDepth(): number{
        return this.depth
    }

    /**
     * Replaces a given old child with the given new child.
     * @param oldChild Old child to be replaced
     * @param newChild New child which replaces old child
     */
    replaceChild(oldChild: ParseNodeDrawable, newChild: ParseNodeDrawable){
        newChild.updateDepths(this.depth + 1);
        newChild.parent = this;
        this.children[this.children.indexOf(oldChild)] = newChild;
    }

    /**
     * Recursive method which updates the depth attribute
     * @param depth Current depth to set.
     */
    updateDepths(depth: number){
        this.depth = depth;
        for (let aChildren of this.children){
            let aChild = <ParseNodeDrawable> aChildren;
            aChild.updateDepths(depth + 1);
        }
    }

    /**
     * Calculates the maximum depth of the subtree rooted from this node.
     * @return The maximum depth of the subtree rooted from this node.
     */
    maxDepth(): number{
        let depth = this.depth;
        for (let aChildren of this.children) {
            let aChild = <ParseNodeDrawable> aChildren;
            if (aChild.maxDepth() > depth)
                depth = aChild.maxDepth();
        }
        return depth;
    }

    /**
     * Recursive method that checks if all nodes in the subtree rooted with this node has the annotation in the given
     * layer.
     * @param viewLayerType Layer name
     * @return True if all nodes in the subtree rooted with this node has the annotation in the given layer, false
     * otherwise.
     */
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

    /**
     * Checks if the current node is a dummy node or not. A node is a dummy node if its data contains '*', or its
     * data is '0' and its parent is '-NONE-'.
     * @return True if the current node is a dummy node, false otherwise.
     */
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

    /**
     * Checks if all nodes in the subtree rooted with this node has annotation with the given layer.
     * @param viewLayerType Layer name
     * @return True if all nodes in the subtree rooted with this node has annotation with the given layer, false
     * otherwise.
     */
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

    /**
     * Recursive method to convert the subtree rooted with this node to a string. All parenthesis types are converted to
     * their regular forms.
     * @return String version of the subtree rooted with this node.
     */
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

    /**
     * Sets the NER layer according to the tag of the parent node and the word in the node. The word is searched in the
     * gazetteer, if it exists, the NER info is replaced with the NER tag in the gazetter.
     * @param gazetteer Gazetteer where we search the word
     * @param word Word to be searched in the gazetteer
     */
    checkGazetteer(gazetteer: Gazetteer, word: string){
        if (gazetteer.contains(word) && this.getParent().getData().getName() == "NNP"){
            this.getLayerInfo().setLayerData(ViewLayerType.NER, gazetteer.getName());
        }
        if (word.includes("'") && gazetteer.contains(word.substring(0, word.indexOf("'"))) && this.getParent().getData().getName() == "NNP"){
            this.getLayerInfo().setLayerData(ViewLayerType.NER, gazetteer.getName());
        }
    }

    /**
     * Recursive method that sets the tag information of the given parse node with all descendants with respect to the
     * morphological annotation of the current node with all descendants.
     * @param parseNode Parse node whose tag information will be changed.
     * @param surfaceForm If true, tag will be replaced with the surface form annotation.
     */
    generateParseNode(parseNode: ParseNode, surfaceForm: boolean){
        if (this.numberOfChildren() == 0){
            if (surfaceForm){
                parseNode.setData(new Symbol(this.getLayerData(ViewLayerType.TURKISH_WORD)))
            } else {
                parseNode.setData(new Symbol(this.getLayerInfo().getMorphologicalParseAt(0).getWord().getName()))
            }
        } else {
            parseNode.setData(this.data)
            for (let i = 0; i < this.numberOfChildren(); i++){
                let newChild = new ParseNode()
                parseNode.addChild(newChild);
                (<ParseNodeDrawable> this.children[i]).generateParseNode(newChild, surfaceForm)
            }
        }
    }

    /**
     * Recursive method to convert the subtree rooted with this node to a string.
     * @return String version of the subtree rooted with this node.
     */
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