import {SingleWordLayer} from "./SingleWordLayer";

export class DependencyLayer extends SingleWordLayer<string>{

    /**
     * Constructor for the dependency layer. Dependency layer stores the dependency information of a node.
     * @param layerValue Value of the dependency layer.
     */
    constructor(layerValue: string) {
        super();
        this.layerName = "dependency"
        this.setLayerValue(layerValue)
    }
}