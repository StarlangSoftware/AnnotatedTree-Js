import {SourceLanguageWordLayer} from "./SourceLanguageWordLayer";

export class EnglishWordLayer extends SourceLanguageWordLayer{

    constructor(layerValue: string) {
        super(layerValue);
        this.layerName = "english"
    }
}