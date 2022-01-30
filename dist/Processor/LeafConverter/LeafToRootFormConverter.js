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
    exports.LeafToRootFormConverter = void 0;
    class LeafToRootFormConverter {
        leafConverter(parseNodeDrawable) {
            let layerInfo = parseNodeDrawable.getLayerInfo();
            let rootWords = " ";
            for (let i = 0; i < layerInfo.getNumberOfWords(); i++) {
                let root = layerInfo.getMorphologicalParseAt(i).getWord().getName();
                if (root != null && root != "") {
                    rootWords += " " + root;
                }
            }
            return rootWords.toString();
        }
    }
    exports.LeafToRootFormConverter = LeafToRootFormConverter;
});
//# sourceMappingURL=LeafToRootFormConverter.js.map