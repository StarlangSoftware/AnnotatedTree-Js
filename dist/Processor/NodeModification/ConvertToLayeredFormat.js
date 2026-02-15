"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConvertToLayeredFormat = void 0;
const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
class ConvertToLayeredFormat {
    modifier(parseNode) {
        if (parseNode.isLeaf()) {
            let name = parseNode.getData().getName();
            parseNode.clearLayers();
            parseNode.getLayerInfo().setLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD, name);
            parseNode.clearData();
        }
    }
}
exports.ConvertToLayeredFormat = ConvertToLayeredFormat;
//# sourceMappingURL=ConvertToLayeredFormat.js.map