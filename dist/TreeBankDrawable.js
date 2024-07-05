(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "nlptoolkit-parsetree/dist/TreeBank", "fs", "./ParseTreeDrawable"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.TreeBankDrawable = void 0;
    const TreeBank_1 = require("nlptoolkit-parsetree/dist/TreeBank");
    const fs = require("fs");
    const ParseTreeDrawable_1 = require("./ParseTreeDrawable");
    class TreeBankDrawable extends TreeBank_1.TreeBank {
        /**
         * A constructor of {@link TreeBankDrawable} class which reads all {@link ParseTreeDrawable} files with the file
         * name satisfying the given pattern inside the given folder. For each file inside that folder, the constructor
         * creates a ParseTreeDrawable and puts in inside the list parseTrees.
         * @param folder Folder where all parseTrees reside.
         * @param pattern File pattern such as "." ".train" ".test".
         */
        constructor(folder, pattern) {
            super();
            let files = fs.readdirSync(folder);
            files.sort();
            for (let file of files) {
                if (pattern != undefined) {
                    if (!file.includes(pattern)) {
                        continue;
                    }
                }
                let parseTree = new ParseTreeDrawable_1.ParseTreeDrawable(folder + "/" + file);
                if (parseTree.getRoot() != undefined) {
                    parseTree.setName(file);
                    this.parseTrees.push(parseTree);
                }
            }
        }
        /**
         * Accessor for the parseTrees attribute
         * @return ParseTrees attribute
         */
        getParseTrees() {
            return this.parseTrees;
        }
        /**
         * Accessor for a specific tree with the given position in the array.
         * @param index Index of the parseTree.
         * @return Tree that is in the position index
         */
        get(index) {
            return this.parseTrees[index];
        }
        /**
         * Clears the given layer for all nodes in all trees
         * @param layerType Layer name
         */
        clearLayer(layerType) {
            for (let tree of this.parseTrees) {
                let parseTree = tree;
                parseTree.clearLayer(layerType);
            }
        }
        removeTree(index) {
            this.parseTrees.slice(index, 1);
        }
    }
    exports.TreeBankDrawable = TreeBankDrawable;
});
//# sourceMappingURL=TreeBankDrawable.js.map