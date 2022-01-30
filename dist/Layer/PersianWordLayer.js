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
    exports.PersianWordLayer = void 0;
    const TargetLanguageWordLayer_1 = require("./TargetLanguageWordLayer");
    class PersianWordLayer extends TargetLanguageWordLayer_1.TargetLanguageWordLayer {
        constructor(layerValue) {
            super(layerValue);
            this.layerName = "persian";
        }
    }
    exports.PersianWordLayer = PersianWordLayer;
});
//# sourceMappingURL=PersianWordLayer.js.map