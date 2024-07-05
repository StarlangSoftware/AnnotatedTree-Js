(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-annotatedsentence/dist/ViewLayerType", "../Condition/IsTurkishLeafNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NotContainsLayerInformation = void 0;
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const IsTurkishLeafNode_1 = require("../Condition/IsTurkishLeafNode");
    class NotContainsLayerInformation {
        /**
         * Constructor for NotContainsLayerInformation class. Sets the viewLayerType attribute.
         * @param viewLayerType Layer for which check is done.
         */
        constructor(viewLayerType) {
            this.viewLayerType = viewLayerType;
        }
        /**
         * Checks if none of the leaf nodes in the leafList contains the given layer information.
         * @param leafList Array list storing the leaf nodes.
         * @return True if none of the leaf nodes in the leafList contains the given layer information, false otherwise.
         */
        satisfies(leafList) {
            for (let parseNode of leafList) {
                if (!parseNode.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD).includes("*")) {
                    switch (this.viewLayerType) {
                        case ViewLayerType_1.ViewLayerType.TURKISH_WORD:
                            if (parseNode.getLayerData(this.viewLayerType) != null) {
                                return false;
                            }
                            break;
                        case ViewLayerType_1.ViewLayerType.PART_OF_SPEECH:
                        case ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP:
                        case ViewLayerType_1.ViewLayerType.NER:
                        case ViewLayerType_1.ViewLayerType.SEMANTICS:
                            if (parseNode.getLayerData(this.viewLayerType) != null && new IsTurkishLeafNode_1.IsTurkishLeafNode().satisfies(parseNode)) {
                                return false;
                            }
                            break;
                    }
                }
            }
            return true;
        }
    }
    exports.NotContainsLayerInformation = NotContainsLayerInformation;
});
//# sourceMappingURL=NotContainsLayerInformation.js.map