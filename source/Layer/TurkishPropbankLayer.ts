import {SingleWordLayer} from "./SingleWordLayer";
import {Argument} from "nlptoolkit-propbank/dist/Argument";

export class TurkishPropbankLayer extends SingleWordLayer<Argument>{

    private propbank: Argument = null

    constructor(layerValue: string) {
        super();
        this.layerName = "propBank"
        this.setLayerValue(layerValue)
    }

    setLayerValue(layerValue: string) {
        this.layerValue = layerValue
        this.propbank = new Argument(layerValue)
    }

    getArgument(): Argument{
        return this.propbank
    }

    getLayerValue(): string {
        return this.propbank.getArgumentType() + "$" + this.propbank.getId()
    }
}