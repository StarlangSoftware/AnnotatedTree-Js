import {TargetLanguageWordLayer} from "./TargetLanguageWordLayer";

export class TurkishWordLayer extends TargetLanguageWordLayer{

    /**
     * Constructor for the word layer for Turkish language. Sets the surface form.
     * @param layerValue Value for the word layer.
     */
    constructor(layerValue: string) {
        super(layerValue);
        this.layerName = "turkish"
    }
}