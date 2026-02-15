"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeModifier = void 0;
class TreeModifier {
    parseTree;
    nodeModifier;
    nodeModifyPrivate(parseNode) {
        this.nodeModifier.modifier(parseNode);
        for (let i = 0; i < parseNode.numberOfChildren(); i++) {
            this.nodeModifyPrivate(parseNode.getChild(i));
        }
    }
    nodeModify() {
        this.nodeModifyPrivate(this.parseTree.getRoot());
    }
}
exports.TreeModifier = TreeModifier;
//# sourceMappingURL=TreeModifier.js.map