"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeBankDrawable = void 0;
const TreeBank_1 = require("nlptoolkit-parsetree/dist/TreeBank");
const fs = __importStar(require("fs"));
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
//# sourceMappingURL=TreeBankDrawable.js.map