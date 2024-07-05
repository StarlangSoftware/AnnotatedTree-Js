export declare abstract class WordLayer {
    protected layerValue: string;
    protected layerName: string;
    /**
     * Accessor for the layerValue attribute.
     * @return LayerValue attribute.
     */
    getLayerValue(): string;
    /**
     * Accessor for the layerName attribute.
     * @return LayerName attribute.
     */
    getLayerName(): string;
    /**
     * Returns string form of the word layer.
     * @return String form of the word layer.
     */
    getLayerDescription(): string;
}
