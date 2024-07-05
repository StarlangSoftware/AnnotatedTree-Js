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
        /**
         * Constructor of the TreeToStringConverter class. Sets the attributes.
         * @param parseTree Parse tree to be converted.
         * @param converter Node to string converter interface.
         */
        constructor(parseTree, converter) {
            this.converter = converter;
            this.parseTree = parseTree;
        }
        /**
         * Converts recursively a parse node to a string. If it is a leaf node, calls the converter's leafConverter method,
         * otherwise concatenates the converted strings of its children.
         * @param parseNode Parse node to convert to string.
         * @return String form of the parse node and all of its descendants.
         */
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
        /**
         * Calls the convertToString method with root of the tree to convert the parse tree to string.
         * @return String form of the parse tree.
         */
        convert() {
            return this.convertToString(this.parseTree.getRoot());
        }
    }
    exports.TreeToStringConverter = TreeToStringConverter;
});
//# sourceMappingURL=TreeToStringConverter.js.map