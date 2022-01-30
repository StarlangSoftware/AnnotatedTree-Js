import {SingleWordLayer} from "./SingleWordLayer";

export class EnglishSemanticLayer extends SingleWordLayer<string>{

    constructor(layerValue: string) {
        super();
        this.layerName = "englishSemantics"
        this.setLayerValue(layerValue)
    }
}