(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TargetLanguageWordLayer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TurkishWordLayer = void 0;
    const TargetLanguageWordLayer_1 = require("./TargetLanguageWordLayer");
    class TurkishWordLayer extends TargetLanguageWordLayer_1.TargetLanguageWordLayer {
        /**
         * Constructor for the word layer for Turkish language. Sets the surface form.
         * @param layerValue Value for the word layer.
         */
        constructor(layerValue) {
            super(layerValue);
            this.layerName = "turkish";
        }
    }
    exports.TurkishWordLayer = TurkishWordLayer;
});
//# sourceMappingURL=TurkishWordLayer.js.map