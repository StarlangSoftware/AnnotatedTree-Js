(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SingleWordLayer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SourceLanguageWordLayer = void 0;
    const SingleWordLayer_1 = require("./SingleWordLayer");
    class SourceLanguageWordLayer extends SingleWordLayer_1.SingleWordLayer {
        /**
         * Sets the name of the word
         * @param layerValue Name of the word
         */
        constructor(layerValue) {
            super();
            this.setLayerValue(layerValue);
        }
    }
    exports.SourceLanguageWordLayer = SourceLanguageWordLayer;
});
//# sourceMappingURL=SourceLanguageWordLayer.js.map