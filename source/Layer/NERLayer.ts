import {SingleWordLayer} from "./SingleWordLayer";
import {NamedEntityType} from "nlptoolkit-namedentityrecognition/dist/NamedEntityType";
import {NamedEntityTypeStatic} from "nlptoolkit-namedentityrecognition/dist/NamedEntityTypeStatic";

export class NERLayer extends SingleWordLayer<NamedEntityType>{

    private namedEntity: NamedEntityType = null

    constructor(layerValue: string) {
        super();
        this.layerName = "namedEntity"
        this.setLayerValue(layerValue)
    }

    setLayerValue(layerValue: string) {
        this.layerValue = layerValue
        this.namedEntity = NamedEntityTypeStatic.getNamedEntityType(layerValue)
    }

    getLayerValue(): string {
        return NamedEntityTypeStatic.getNamedEntity(this.namedEntity)
    }
}