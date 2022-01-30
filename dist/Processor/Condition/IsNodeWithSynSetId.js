(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./IsLeafNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IsNodeWithSynSetId = void 0;
    const IsLeafNode_1 = require("./IsLeafNode");
    class IsNodeWithSynSetId extends IsLeafNode_1.IsLeafNode {
        constructor(id) {
            super();
            this.id = id;
        }
        satisfies(parseNode) {
            if (super.satisfies(parseNode)) {
                let layerInfo = parseNode.getLayerInfo();
                for (let i = 0; i < layerInfo.getNumberOfMeanings(); i++) {
                    let synSetId = layerInfo.getSemanticAt(i);
                    if (synSetId == this.id) {
                        return true;
                    }
                }
            }
            return false;
        }
    }
    exports.IsNodeWithSynSetId = IsNodeWithSynSetId;
});
//# sourceMappingURL=IsNodeWithSynSetId.js.map