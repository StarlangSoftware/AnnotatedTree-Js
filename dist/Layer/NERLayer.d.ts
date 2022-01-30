import { SingleWordLayer } from "./SingleWordLayer";
import { NamedEntityType } from "nlptoolkit-namedentityrecognition/dist/NamedEntityType";
export declare class NERLayer extends SingleWordLayer<NamedEntityType> {
    private namedEntity;
    constructor(layerValue: string);
    setLayerValue(layerValue: string): void;
    getLayerValue(): string;
}
