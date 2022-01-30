import {MetaMorphemesMovedLayer} from "./MetaMorphemesMovedLayer";
import {MetamorphicParse} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MetamorphicParse";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class MetaMorphemeLayer extends MetaMorphemesMovedLayer{

    constructor(layerValue: string) {
        super(layerValue);
        this.layerName = "metaMorphemes"
    }

    setLayerValue(parse: any): void{
        this.layerValue = parse.toString();
        this.items = new Array<MetamorphicParse>();
        if (this.layerValue != null){
            let splitWords = this.layerValue.split("\\s");
            for (let word of splitWords){
                this.items.push(new MetamorphicParse(word));
            }
        }
    }

    getLayerInfoFrom(index: number): string{
        let size = 0;
        for (let parse of this.items){
            if (index < size + parse.size()){
                let result = parse.getMetaMorpheme(index - size);
                index++;
                while (index < size + parse.size()){
                    result = result + "+" + parse.getMetaMorpheme(index - size);
                    index++;
                }
                return result;
            }
            size += parse.size();
        }
        return null;
    }

    metaMorphemeRemoveFromIndex(index: number): MetamorphicParse{
        if (index >= 0 && index < this.getLayerSize(ViewLayerType.META_MORPHEME)){
            let size = 0;
            for (let parse of this.items){
                if (index < size + parse.size()){
                    parse.removeMetaMorphemeFromIndex(index - size);
                    return parse;
                }
                size += parse.size();
            }
        }
        return null;
    }
}