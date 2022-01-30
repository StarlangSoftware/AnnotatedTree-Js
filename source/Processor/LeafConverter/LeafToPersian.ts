import {LeafToLanguageConverter} from "./LeafToLanguageConverter";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class LeafToPersian extends LeafToLanguageConverter{

    constructor() {
        super();
        this.viewLayerType = ViewLayerType.PERSIAN_WORD
    }
}