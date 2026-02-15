"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeafToEnglish = void 0;
const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
const LeafToLanguageConverter_1 = require("./LeafToLanguageConverter");
class LeafToEnglish extends LeafToLanguageConverter_1.LeafToLanguageConverter {
    /**
     * Constructor for LeafToEnglish. Sets viewLayerType to ENGLISH.
     */
    constructor() {
        super();
        this.viewLayerType = ViewLayerType_1.ViewLayerType.ENGLISH_WORD;
    }
}
exports.LeafToEnglish = LeafToEnglish;
//# sourceMappingURL=LeafToEnglish.js.map