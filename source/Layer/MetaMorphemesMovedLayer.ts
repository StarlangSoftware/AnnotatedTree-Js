import {MultiWordMultiItemLayer} from "./MultiWordMultiItemLayer";
import {MetamorphicParse} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class MetaMorphemesMovedLayer extends MultiWordMultiItemLayer<MetamorphicParse>{

    constructor(layerValue: string) {
        super();
        this.layerName = "metaMorphemesMoved"
        this.setLayerValue(layerValue)
    }

    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string {
        let size = 0;
        for (let parse of this.items){
            if (index < size + parse.size()){
                return parse.getMetaMorpheme(index - size);
            }
            size += parse.size();
        }
        return null;
    }

    getLayerSize(viewLayer: ViewLayerType): number {
        let size = 0;
        for (let parse of this.items){
            size += parse.size();
        }
        return size;
    }

    setLayerValue(layerValue: string): void {
        this.items = new Array<MetamorphicParse>();
        this.layerValue = layerValue;
        if (layerValue != null){
            let splitWords = layerValue.split("\\s");
            for (let word of splitWords){
                this.items.push(new MetamorphicParse(word));
            }
        }
    }
    
}