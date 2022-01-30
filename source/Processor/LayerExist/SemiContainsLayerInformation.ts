import {LeafListCondition} from "./LeafListCondition";
import {ParseNodeDrawable} from "../../ParseNodeDrawable";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {IsTurkishLeafNode} from "../Condition/IsTurkishLeafNode";

export class SemiContainsLayerInformation implements LeafListCondition{

    private readonly viewLayerType: ViewLayerType

    constructor(viewLayerType: ViewLayerType) {
        this.viewLayerType = viewLayerType
    }

    satisfies(leafList: Array<ParseNodeDrawable>): boolean {
        let notDone = 0, done = 0;
        for (let parseNode of leafList){
            if (!parseNode.getLayerData(ViewLayerType.ENGLISH_WORD).includes("*")) {
                switch (this.viewLayerType){
                    case ViewLayerType.TURKISH_WORD:
                        if (parseNode.getLayerData(this.viewLayerType) != null){
                            done++;
                        } else {
                            notDone++;
                        }
                        break;
                    case ViewLayerType.PART_OF_SPEECH:
                    case ViewLayerType.INFLECTIONAL_GROUP:
                    case ViewLayerType.NER:
                    case ViewLayerType.SEMANTICS:
                        if (new IsTurkishLeafNode().satisfies(parseNode)){
                            if (parseNode.getLayerData(this.viewLayerType) != null){
                                done++;
                            } else {
                                notDone++;
                            }
                        }
                        break;
                }
            }
        }
        return done != 0 && notDone != 0;
    }

}