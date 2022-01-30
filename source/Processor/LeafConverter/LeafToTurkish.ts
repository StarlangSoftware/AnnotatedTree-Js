import {LeafToLanguageConverter} from "./LeafToLanguageConverter";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class LeafToTurkish extends LeafToLanguageConverter{

    constructor() {
        super();
        this.viewLayerType = ViewLayerType.TURKISH_WORD
    }
}