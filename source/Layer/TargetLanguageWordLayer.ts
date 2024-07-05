import {MultiWordLayer} from "./MultiWordLayer";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export abstract class TargetLanguageWordLayer extends MultiWordLayer<string>{

    /**
     * Sets the surface form(s) of the word(s) possibly separated with space.
     * @param layerValue Surface form(s) of the word(s) possibly separated with space.
     */
    protected constructor(layerValue: string) {
        super();
        this.setLayerValue(layerValue)
    }

    /**
     * Sets the surface form(s) of the word(s). Value may consist of multiple surface form(s)
     * separated via space character.
     * @param layerValue New layer info
     */
    setLayerValue(layerValue: string) {
        this.items = new Array<string>();
        this.layerValue = layerValue;
        if (layerValue != null){
            let splitWords = layerValue.split("\\s");
            for (let item of splitWords){
                this.items.push(item)
            }
        }
    }

    getLayerSize(viewLayer: ViewLayerType): number{
        return 0;
    }

    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string{
        return null;
    }
}