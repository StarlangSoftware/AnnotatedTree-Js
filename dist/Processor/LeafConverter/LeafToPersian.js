"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeafToPersian = void 0;
const LeafToLanguageConverter_1 = require("./LeafToLanguageConverter");
const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
class LeafToPersian extends LeafToLanguageConverter_1.LeafToLanguageConverter {
    /**
     * Constructor for LeafToPersian. Sets viewLayerType to PERSIAN.
     */
    constructor() {
        super();
        this.viewLayerType = ViewLayerType_1.ViewLayerType.PERSIAN_WORD;
    }
}
exports.LeafToPersian = LeafToPersian;
//# sourceMappingURL=LeafToPersian.js.map