import {LeafListCondition} from "./LeafListCondition";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {IsTurkishLeafNode} from "../Condition/IsTurkishLeafNode";

export class NotContainsLayerInformation implements LeafListCondition{

    private readonly viewLayerType: ViewLayerType

    /**
     * Constructor for NotContainsLayerInformation class. Sets the viewLayerType attribute.
     * @param viewLayerType Layer for which check is done.
     */
    constructor(viewLayerType: ViewLayerType) {
        this.viewLayerType = viewLayerType
    }

    /**
     * Checks if none of the leaf nodes in the leafList contains the given layer information.
     * @param leafList Array list storing the leaf nodes.
     * @return True if none of the leaf nodes in the leafList contains the given layer information, false otherwise.
     */
    satisfies(leafList: Array<ParseNodeDrawable>): boolean {
        for (let parseNode of leafList){
            if (!parseNode.getLayerData(ViewLayerType.ENGLISH_WORD).includes("*")) {
                switch (this.viewLayerType){
                    case ViewLayerType.TURKISH_WORD:
                        if (parseNode.getLayerData(this.viewLayerType) != null){
                            return false;
                        }
                        break;
                    case ViewLayerType.PART_OF_SPEECH:
                    case ViewLayerType.INFLECTIONAL_GROUP:
                    case ViewLayerType.NER:
                    case ViewLayerType.SEMANTICS:
                        if (parseNode.getLayerData(this.viewLayerType) != null && new IsTurkishLeafNode().satisfies(parseNode)){
                            return false;
                        }
                        break;
                }
            }
        }
        return true;
    }

}