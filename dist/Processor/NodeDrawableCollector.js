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
    exports.NodeDrawableCollector = void 0;
    class NodeDrawableCollector {
        constructor(rootNode, condition) {
            this.rootNode = rootNode;
            this.condition = condition;
        }
        collectNodes(parseNode, collected) {
            if (this.condition == null || this.condition.satisfies(parseNode)) {
                collected.push(parseNode);
            }
            for (let i = 0; i < parseNode.numberOfChildren(); i++) {
                this.collectNodes(parseNode.getChild(i), collected);
            }
        }
        collect() {
            let result = new Array();
            this.collectNodes(this.rootNode, result);
            return result;
        }
    }
    exports.NodeDrawableCollector = NodeDrawableCollector;
});
//# sourceMappingURL=NodeDrawableCollector.js.map