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
    exports.TreeToStringConverter = void 0;
    class TreeToStringConverter {
        constructor(parseTree, converter) {
            this.converter = converter;
            this.parseTree = parseTree;
        }
        convertToString(parseNode) {
            if (parseNode.isLeaf()) {
                return this.converter.leafConverter(parseNode);
            }
            else {
                let st = "";
                for (let i = 0; i < parseNode.numberOfChildren(); i++) {
                    st = st + this.convertToString(parseNode.getChild(i));
                }
                return st;
            }
        }
        convert() {
            return this.convertToString(this.parseTree.getRoot());
        }
    }
    exports.TreeToStringConverter = TreeToStringConverter;
});
//# sourceMappingURL=TreeToStringConverter.js.map