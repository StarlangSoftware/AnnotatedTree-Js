import { MultiWordLayer } from "./MultiWordLayer";
import { ViewLayerType } from "nlptoolkit-annotatedsentence/dist/ViewLayerType";
export declare abstract class TargetLanguageWordLayer extends MultiWordLayer<string> {
    /**
     * Sets the surface form(s) of the word(s) possibly separated with space.
     * @param layerValue Surface form(s) of the word(s) possibly separated with space.
     */
    protected constructor(layerValue: string);
    /**
     * Sets the surface form(s) of the word(s). Value may consist of multiple surface form(s)
     * separated via space character.
     * @param layerValue New layer info
     */
    setLayerValue(layerValue: string): void;
    getLayerSize(viewLayer: ViewLayerType): number;
    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string;
}
