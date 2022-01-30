(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "./LeafToLanguageConverter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LeafToEnglish = void 0;
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const LeafToLanguageConverter_1 = require("./LeafToLanguageConverter");
    class LeafToEnglish extends LeafToLanguageConverter_1.LeafToLanguageConverter {
        constructor() {
            super();
            this.viewLayerType = ViewLayerType_1.ViewLayerType.ENGLISH_WORD;
        }
    }
    exports.LeafToEnglish = LeafToEnglish;
});
//# sourceMappingURL=LeafToEnglish.js.map