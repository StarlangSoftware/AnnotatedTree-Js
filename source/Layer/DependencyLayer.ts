import {SingleWordLayer} from "./SingleWordLayer";

export class DependencyLayer extends SingleWordLayer<string>{

    constructor(layerValue: string) {
        super();
        this.layerName = "dependency"
        this.setLayerValue(layerValue)
    }
}