(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
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
});
//# sourceMappingURL=ConvertToLayeredFormat.js.map