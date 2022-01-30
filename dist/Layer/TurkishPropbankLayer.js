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
        constructor(layerValue) {
            super();
            this.propbank = null;
            this.layerName = "propBank";
            this.setLayerValue(layerValue);
        }
        setLayerValue(layerValue) {
            this.layerValue = layerValue;
            this.propbank = new Argument_1.Argument(layerValue);
        }
        getArgument() {
            return this.propbank;
        }
        getLayerValue() {
            return this.propbank.getArgumentType() + "$" + this.propbank.getId();
        }
    }
    exports.TurkishPropbankLayer = TurkishPropbankLayer;
});
//# sourceMappingURL=TurkishPropbankLayer.js.map