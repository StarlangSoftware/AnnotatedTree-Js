(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./LeafToLanguageConverter", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LeafToTurkish = void 0;
    const LeafToLanguageConverter_1 = require("./LeafToLanguageConverter");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    class LeafToTurkish extends LeafToLanguageConverter_1.LeafToLanguageConverter {
        constructor() {
            super();
            this.viewLayerType = ViewLayerType_1.ViewLayerType.TURKISH_WORD;
        }
    }
    exports.LeafToTurkish = LeafToTurkish;
});
//# sourceMappingURL=LeafToTurkish.js.map