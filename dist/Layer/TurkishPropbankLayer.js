(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SingleWordLayer", "nlptoolkit-propbank/dist/Argument"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurkishPropbankLayer = void 0;
    const SingleWordLayer_1 = require("./SingleWordLayer");
    const Argument_1 = require("nlptoolkit-propbank/dist/Argument");
    class TurkishPropbankLayer extends SingleWordLayer_1.SingleWordLayer {
        /**
         * Constructor for the Turkish propbank layer. Sets single semantic role information for multiple words in
         * the node.
         * @param layerValue Layer value for the propbank information. Consists of semantic role information
         *                   of multiple words.
         */
        constructor(layerValue) {
            super();
            this.propbank = null;
            this.layerName = "propBank";
            this.setLayerValue(layerValue);
        }
        /**
         * Sets the layer value for Turkish propbank layer. Converts the string form to an Argument.
         * @param layerValue New value for Turkish propbank layer.
         */
        setLayerValue(layerValue) {
            this.layerValue = layerValue;
            this.propbank = new Argument_1.Argument(layerValue);
        }
        /**
         * Accessor for the propbank field.
         * @return Propbank field.
         */
        getArgument() {
            return this.propbank;
        }
        /**
         * Another accessor for the propbank field.
         * @return String form of the propbank field.
         */
        getLayerValue() {
            return this.propbank.getArgumentType() + "$" + this.propbank.getId();
        }
    }
    exports.TurkishPropbankLayer = TurkishPropbankLayer;
});
//# sourceMappingURL=TurkishPropbankLayer.js.map