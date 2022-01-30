import { MultiWordLayer } from "./MultiWordLayer";
export declare class ShallowParseLayer extends MultiWordLayer<string> {
    constructor(layerValue: string);
    setLayerValue(layerValue: string): void;
}
