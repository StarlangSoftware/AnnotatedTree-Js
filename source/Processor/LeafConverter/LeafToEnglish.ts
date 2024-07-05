import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
import {LeafToLanguageConverter} from "./LeafToLanguageConverter";

export class LeafToEnglish extends LeafToLanguageConverter{

    /**
     * Constructor for LeafToEnglish. Sets viewLayerType to ENGLISH.
     */
    constructor() {
        super()
        this.viewLayerType = ViewLayerType.ENGLISH_WORD;
    }

}