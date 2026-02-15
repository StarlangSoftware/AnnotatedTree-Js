"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsVPNode = void 0;
class IsVPNode {
    /**
     * Checks if the node is not a leaf node and its tag is VP.
     * @param parseNode Parse node to check.
     * @return True if the node is not a leaf node and its tag is VP, false otherwise.
     */
    satisfies(parseNode) {
        return parseNode.numberOfChildren() > 0 && parseNode.getData().isVP();
    }
}
exports.IsVPNode = IsVPNode;
//# sourceMappingURL=IsVPNode.js.map