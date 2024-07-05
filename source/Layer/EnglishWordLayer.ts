import {SourceLanguageWordLayer} from "./SourceLanguageWordLayer";

export class EnglishWordLayer extends SourceLanguageWordLayer{

    /**
     * Constructor for the word layer for English language. Sets the surface form.
     * @param layerValue Value for the word layer.
     */
    constructor(layerValue: string) {
        super(layerValue);
        this.layerName = "english"
    }
}