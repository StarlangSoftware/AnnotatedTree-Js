(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsLeafNode", "nlptoolkit-annotatedsentence/dist/ViewLayerType"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsTurkishLeafNode = void 0;
    const IsLeafNode_1 = require("./IsLeafNode");
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    class IsTurkishLeafNode extends IsLeafNode_1.IsLeafNode {
        satisfies(parseNode) {
            if (super.satisfies(parseNode)) {
                let data = parseNode.getLayerInfo().getLayerData(ViewLayerType_1.ViewLayerType.TURKISH_WORD);
                let parentData = parseNode.getParent().getData().getName();
                return data != null && !data.includes("*") && !(data == "0" && parentData == "-NONE-");
            }
            return false;
        }
    }
    exports.IsTurkishLeafNode = IsTurkishLeafNode;
});
//# sourceMappingURL=IsTurkishLeafNode.js.map