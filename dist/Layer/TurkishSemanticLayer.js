(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./MultiWordLayer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurkishSemanticLayer = void 0;
    const MultiWordLayer_1 = require("./MultiWordLayer");
    class TurkishSemanticLayer extends MultiWordLayer_1.MultiWordLayer {
        /**
         * Constructor for the Turkish semantic layer. Sets semantic information for each word in
         * the node.
         * @param layerValue Layer value for the Turkish semantic information. Consists of semantic (Turkish synset id)
         *                   information for every word.
         */
        constructor(layerValue) {
            super();
            this.layerName = "semantics";
            this.setLayerValue(layerValue);
        }
        /**
         * Sets the value for the Turkish semantic layer in a node. Value may consist of multiple sense information
         * separated via '$' character. Each sense value is a string representing the synset id of the sense.
         * @param layerValue New layer info
         */
        setLayerValue(layerValue) {
            this.items = new Array();
            this.layerValue = layerValue;
            if (layerValue != null) {
                let splitMeanings = layerValue.split("\\$");
                for (let meaning of splitMeanings) {
                    this.items.push(meaning);
                }
            }
        }
    }
    exports.TurkishSemanticLayer = TurkishSemanticLayer;
});
//# sourceMappingURL=TurkishSemanticLayer.js.map