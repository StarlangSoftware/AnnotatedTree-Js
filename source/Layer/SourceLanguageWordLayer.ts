import {SingleWordLayer} from "./SingleWordLayer";

export abstract class SourceLanguageWordLayer extends SingleWordLayer<string>{

    constructor(layerValue: string) {
        super();
        this.setLayerValue(layerValue)
    }
}