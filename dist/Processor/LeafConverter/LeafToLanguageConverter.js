(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.LeafToLanguageConverter = void 0;
    class LeafToLanguageConverter {
        leafConverter(leafNode) {
            let layerData = leafNode.getLayerData(this.viewLayerType);
            let parentLayerData = leafNode.getParent().getLayerData(this.viewLayerType);
            if (layerData != null) {
                if (layerData.includes("*") || (layerData == "0" && parentLayerData == "-NONE-")) {
                    return "";
                }
                else {
                    return " " + layerData
                        .replace("-LRB-", "(")
                        .replace("-RRB-", ")")
                        .replace("-LSB-", "[")
                        .replace("-RSB-", "]")
                        .replace("-LCB-", "{")
                        .replace("-RCB-", "}")
                        .replace("-lrb-", "(")
                        .replace("-rrb-", ")")
                        .replace("-lsb-", "[")
                        .replace("-rsb-", "]")
                        .replace("-lcb-", "{")
                        .replace("-rcb-", "}");
                }
            }
            else {
                return "";
            }
        }
    }
    exports.LeafToLanguageConverter = LeafToLanguageConverter;
});
//# sourceMappingURL=LeafToLanguageConverter.js.map