"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeafToTurkish = void 0;
const LeafToLanguageConverter_1 = require("./LeafToLanguageConverter");
const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
class LeafToTurkish extends LeafToLanguageConverter_1.LeafToLanguageConverter {
    /**
     * Constructor for LeafToPersian. Sets viewLayerType to TURKISH.
     */
    constructor() {
        super();
        this.viewLayerType = ViewLayerType_1.ViewLayerType.TURKISH_WORD;
    }
}
exports.LeafToTurkish = LeafToTurkish;
//# sourceMappingURL=LeafToTurkish.js.map