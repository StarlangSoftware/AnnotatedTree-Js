import {TargetLanguageWordLayer} from "./TargetLanguageWordLayer";

export class PersianWordLayer extends TargetLanguageWordLayer{

    constructor(layerValue: string) {
        super(layerValue);
        this.layerName = "persian"
    }
}