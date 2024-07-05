(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SourceLanguageWordLayer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.EnglishWordLayer = void 0;
    const SourceLanguageWordLayer_1 = require("./SourceLanguageWordLayer");
    class EnglishWordLayer extends SourceLanguageWordLayer_1.SourceLanguageWordLayer {
        /**
         * Constructor for the word layer for English language. Sets the surface form.
         * @param layerValue Value for the word layer.
         */
        constructor(layerValue) {
            super(layerValue);
            this.layerName = "english";
        }
    }
    exports.EnglishWordLayer = EnglishWordLayer;
});
//# sourceMappingURL=EnglishWordLayer.js.map