import { SingleWordLayer } from "./SingleWordLayer";
import { Argument } from "nlptoolkit-propbank/dist/Argument";
export declare class TurkishPropbankLayer extends SingleWordLayer<Argument> {
    private propbank;
    constructor(layerValue: string);
    setLayerValue(layerValue: string): void;
    getArgument(): Argument;
    getLayerValue(): string;
}
