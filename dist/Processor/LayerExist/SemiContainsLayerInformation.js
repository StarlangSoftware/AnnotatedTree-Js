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
    exports.SemiContainsLayerInformation = void 0;
    const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
    const IsTurkishLeafNode_1 = require("../Condition/IsTurkishLeafNode");
    class SemiContainsLayerInformation {
        /**
         * Constructor for SemiContainsLayerInformation class. Sets the viewLayerType attribute.
         * @param viewLayerType Layer for which check is done.
         */
        constructor(viewLayerType) {
            this.viewLayerType = viewLayerType;
        }
        /**
         * Checks if some (but not all) of the leaf nodes in the leafList contains the given layer information.
         * @param leafList Array list storing the leaf nodes.
         * @return True if some (but not all) of the leaf nodes in the leafList contains the given layer information, false
         * otherwise.
         */
        satisfies(leafList) {
            let notDone = 0, done = 0;
            for (let parseNode of leafList) {
                if (!parseNode.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD).includes("*")) {
                    switch (this.viewLayerType) {
                        case ViewLayerType_1.ViewLayerType.TURKISH_WORD:
                            if (parseNode.getLayerData(this.viewLayerType) != null) {
                                done++;
                            }
                            else {
                                notDone++;
                            }
                            break;
                        case ViewLayerType_1.ViewLayerType.PART_OF_SPEECH:
                        case ViewLayerType_1.ViewLayerType.INFLECTIONAL_GROUP:
                        case ViewLayerType_1.ViewLayerType.NER:
                        case ViewLayerType_1.ViewLayerType.SEMANTICS:
                            if (new IsTurkishLeafNode_1.IsTurkishLeafNode().satisfies(parseNode)) {
                                if (parseNode.getLayerData(this.viewLayerType) != null) {
                                    done++;
                                }
                                else {
                                    notDone++;
                                }
                            }
                            break;
                    }
                }
            }
            return done != 0 && notDone != 0;
        }
    }
    exports.SemiContainsLayerInformation = SemiContainsLayerInformation;
});
//# sourceMappingURL=SemiContainsLayerInformation.js.map