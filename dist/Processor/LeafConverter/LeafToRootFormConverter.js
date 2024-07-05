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
        /**
         * Converts the data in the leaf node to string. If there are multiple words in the leaf node, they are concatenated
         * with space.
         * @param parseNodeDrawable Node to be converted to string.
         * @return String form of the data. If there are multiple words in the leaf node, they are concatenated
         * with space.
         */
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