import {MultiWordMultiItemLayer} from "./MultiWordMultiItemLayer";
import {MorphologicalParse} from "nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/MorphologicalParse";
import {ViewLayerType} from "nlptoolkit-annotatedsentence/dist/ViewLayerType";

export class MorphologicalAnalysisLayer extends MultiWordMultiItemLayer<MorphologicalParse>{

    constructor(layerValue: string) {
        super();
        this.layerName = "morphologicalAnalysis"
        this.setLayerValue(layerValue)
    }

    getLayerInfoAt(viewLayer: ViewLayerType, index: number): string {
        let size;
        switch (viewLayer){
            case ViewLayerType.PART_OF_SPEECH:
                size = 0;
                for (let parse of this.items){
                    if (index < size + parse.tagSize()){
                        return parse.getTag(index - size);
                    }
                    size += parse.tagSize();
                }
                return null;
            case ViewLayerType.INFLECTIONAL_GROUP:
                size = 0;
                for (let parse of this.items){
                    if (index < size + parse.size()){
                        return parse.getInflectionalGroupString(index - size);
                    }
                    size += parse.size();
                }
                return null;
        }
        return null;
    }

    getLayerSize(viewLayer: ViewLayerType): number {
        let size
        switch (viewLayer){
            case ViewLayerType.PART_OF_SPEECH:
                size = 0;
                for (let parse of this.items){
                    size += parse.tagSize();
                }
                return size;
            case ViewLayerType.INFLECTIONAL_GROUP:
                size = 0;
                for (let parse of this.items){
                    size += parse.size();
                }
                return size;
            default:
                return 0;
        }
    }

    setLayerValue(layerValue: any): void {
        if (layerValue instanceof MorphologicalParse){
            let parse = layerValue
            this.layerValue = parse.getMorphologicalParseTransitionList();
            this.items = new Array<MorphologicalParse>();
            this.items.push(parse);
        } else {
            this.items = new Array<MorphologicalParse>();
            this.layerValue = layerValue;
            if (layerValue != null){
                let splitWords = layerValue.split("\\s");
                for (let word of splitWords){
                    this.items.push(new MorphologicalParse(word));
                }
            }
        }
    }

    isVerbal(): boolean{
        let dbLabel = "^DB+";
        let needle = "VERB+";
        let haystack
        if (this.layerValue.includes(dbLabel)){
            haystack = this.layerValue.substring(this.layerValue.lastIndexOf(dbLabel) + 4);
        } else {
            haystack = this.layerValue;
        }
        return haystack.includes(needle);
    }

    isNominal(): boolean{
        let dbLabel = "^DB+VERB+";
        let needle = "ZERO+";
        let haystack
        if (this.layerValue.includes(dbLabel)){
            haystack = this.layerValue.substring(this.layerValue.lastIndexOf(dbLabel) + 9);
        } else {
            haystack = this.layerValue;
        }
        return haystack.includes(needle);
    }

}