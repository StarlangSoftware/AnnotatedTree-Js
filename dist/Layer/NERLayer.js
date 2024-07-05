(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SingleWordLayer", "nlptoolkit-namedentityrecognition/dist/NamedEntityTypeStatic"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NERLayer = void 0;
    const SingleWordLayer_1 = require("./SingleWordLayer");
    const NamedEntityTypeStatic_1 = require("nlptoolkit-namedentityrecognition/dist/NamedEntityTypeStatic");
    class NERLayer extends SingleWordLayer_1.SingleWordLayer {
        /**
         * Constructor for the named entity layer. Sets single named entity information for multiple words in
         * the node.
         * @param layerValue Layer value for the named entity information. Consists of single named entity information
         *                   of multiple words.
         */
        constructor(layerValue) {
            super();
            this.namedEntity = null;
            this.layerName = "namedEntity";
            this.setLayerValue(layerValue);
        }
        /**
         * Sets the layer value for Named Entity layer. Converts the string form to a named entity.
         * @param layerValue New value for Named Entity layer.
         */
        setLayerValue(layerValue) {
            this.layerValue = layerValue;
            this.namedEntity = NamedEntityTypeStatic_1.NamedEntityTypeStatic.getNamedEntityType(layerValue);
        }
        /**
         * Get the string form of the named entity value. Converts named entity type to string form.
         * @return String form of the named entity value.
         */
        getLayerValue() {
            return NamedEntityTypeStatic_1.NamedEntityTypeStatic.getNamedEntity(this.namedEntity);
        }
    }
    exports.NERLayer = NERLayer;
});
//# sourceMappingURL=NERLayer.js.map