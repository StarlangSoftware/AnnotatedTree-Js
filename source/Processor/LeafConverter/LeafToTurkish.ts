import {LeafToLanguageConverter} from "./LeafToLanguageConverter";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class LeafToTurkish extends LeafToLanguageConverter{

    /**
     * Constructor for LeafToPersian. Sets viewLayerType to TURKISH.
     */
    constructor() {
        super();
        this.viewLayerType = ViewLayerType.TURKISH_WORD
    }
}