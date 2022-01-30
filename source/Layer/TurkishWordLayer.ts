import {TargetLanguageWordLayer} from "./TargetLanguageWordLayer";

export class TurkishWordLayer extends TargetLanguageWordLayer{

    constructor(layerValue: string) {
        super(layerValue);
        this.layerName = "turkish"
    }
}