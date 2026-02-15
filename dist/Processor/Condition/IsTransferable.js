"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsTransferable = void 0;
const IsLeafNode_1 = require("./IsLeafNode");
const IsNoneNode_1 = require("./IsNoneNode");
const IsNullElement_1 = require("./IsNullElement");
class IsTransferable extends IsLeafNode_1.IsLeafNode {
    secondLanguage;
    constructor(secondLanguage) {
        super();
        this.secondLanguage = secondLanguage;
    }
    /**
     * Checks if the node is a leaf node and is not a None or Null node.
     * @param parseNode Parse node to check.
     * @return True if the node is a leaf node and is not a None or Null node, false otherwise.
     */
    satisfies(parseNode) {
        if (super.satisfies(parseNode)) {
            if (new IsNoneNode_1.IsNoneNode(this.secondLanguage).satisfies(parseNode)) {
                return false;
            }
            return !new IsNullElement_1.IsNullElement().satisfies(parseNode);
        }
        return false;
    }
}
exports.IsTransferable = IsTransferable;
//# sourceMappingURL=IsTransferable.js.map