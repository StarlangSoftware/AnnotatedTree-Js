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
    exports.TreeModifier = void 0;
    class TreeModifier {
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
});
//# sourceMappingURL=TreeModifier.js.map