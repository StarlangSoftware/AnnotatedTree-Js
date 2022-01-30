import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {LeafToLanguageConverter} from "./LeafToLanguageConverter";

export class LeafToEnglish extends LeafToLanguageConverter{

    constructor() {
        super()
        this.viewLayerType = ViewLayerType.ENGLISH_WORD;
    }

}