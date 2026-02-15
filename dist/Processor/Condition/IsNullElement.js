"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNullElement = void 0;
const IsLeafNode_1 = require("./IsLeafNode");
const ViewLayerType_1 = require("nlptoolkit-annotatedsentence/dist/ViewLayerType");
class IsNullElement extends IsLeafNode_1.IsLeafNode {
    /**
     * Checks if the parse node is a leaf node and its data is '*' and its parent's data is '-NONE-'.
     * @param parseNode Parse node to check.
     * @return True if the parse node is a leaf node and its data is '*' and its parent's data is '-NONE-', false
     * otherwise.
     */
    satisfies(parseNode) {
        if (super.satisfies(parseNode)) {
            let data = parseNode.getLayerData(ViewLayerType_1.ViewLayerType.ENGLISH_WORD);
            let parentData = parseNode.getParent().getData().getName();
            return data.includes("*") || (data == "0" && parentData == "-NONE-");
        }
        return false;
    }
}
exports.IsNullElement = IsNullElement;
//# sourceMappingURL=IsNullElement.js.map