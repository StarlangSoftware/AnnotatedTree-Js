import {TargetLanguageWordLayer} from "./TargetLanguageWordLayer";

export class PersianWordLayer extends TargetLanguageWordLayer{

    /**
     * Constructor for the word layer for Persian language. Sets the surface form.
     * @param layerValue Value for the word layer.
     */
    constructor(layerValue: string) {
        super(layerValue);
        this.layerName = "persian"
    }
}