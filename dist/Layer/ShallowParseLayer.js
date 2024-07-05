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
    exports.ShallowParseLayer = void 0;
    const MultiWordLayer_1 = require("./MultiWordLayer");
    class ShallowParseLayer extends MultiWordLayer_1.MultiWordLayer {
        /**
         * Constructor for the shallow parse layer. Sets shallow parse information for each word in
         * the node.
         * @param layerValue Layer value for the shallow parse information. Consists of shallow parse information
         *                   for every word.
         */
        constructor(layerValue) {
            super();
            this.layerName = "shallowParse";
            this.setLayerValue(layerValue);
        }
        /**
         * Sets the value for the shallow parse layer in a node. Value may consist of multiple shallow parse information
         * separated via space character. Each shallow parse value is a string.
         * @param layerValue New layer info
         */
        setLayerValue(layerValue) {
            this.items = new Array();
            this.layerValue = layerValue;
            if (layerValue != null) {
                let splitParse = layerValue.split(" ");
                for (let item of splitParse) {
                    this.items.push(item);
                }
            }
        }
    }
    exports.ShallowParseLayer = ShallowParseLayer;
});
//# sourceMappingURL=ShallowParseLayer.js.map