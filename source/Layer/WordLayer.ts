export abstract class WordLayer {

    protected layerValue: string
    protected layerName: string

    getLayerValue(): string{
        return this.layerValue
    }

    getLayerName(): string{
        return this.layerName
    }

    getLayerDescription(): string{
        return "{" + this.layerName + "=" + this.layerValue + "}"
    }
}