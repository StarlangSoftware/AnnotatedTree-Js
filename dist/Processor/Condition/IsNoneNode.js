"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNoneNode = void 0;
const IsLeafNode_1 = require("./IsLeafNode");
class IsNoneNode extends IsLeafNode_1.IsLeafNode {
    secondLanguage;
    constructor(secondLanguage) {
        super();
        this.secondLanguage = secondLanguage;
    }
    /**
     * Checks if the data of the parse node is '*NONE*'.
     * @param parseNode Parse node to check.
     * @return True if the data of the parse node is '*NONE*', false otherwise.
     */
    satisfies(parseNode) {
        if (super.satisfies(parseNode)) {
            let data = parseNode.getLayerData(this.secondLanguage);
            return data != null && data == "*NONE*";
        }
        return false;
    }
}
exports.IsNoneNode = IsNoneNode;
//# sourceMappingURL=IsNoneNode.js.map