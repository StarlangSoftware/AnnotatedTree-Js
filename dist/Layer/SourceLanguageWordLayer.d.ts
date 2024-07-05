import { SingleWordLayer } from "./SingleWordLayer";
export declare abstract class SourceLanguageWordLayer extends SingleWordLayer<string> {
    /**
     * Sets the name of the word
     * @param layerValue Name of the word
     */
    constructor(layerValue: string);
}
