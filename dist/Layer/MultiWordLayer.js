(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./WordLayer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MultiWordLayer = void 0;
    const WordLayer_1 = require("./WordLayer");
    class MultiWordLayer extends WordLayer_1.WordLayer {
        constructor() {
            super(...arguments);
            this.items = new Array();
        }
        /**
         * Returns the item (word or its property) at position index.
         * @param index Position of the item (word or its property).
         * @return The item at position index.
         */
        getItemAt(index) {
            if (index < this.items.length) {
                return this.items[index];
            }
            else {
                return undefined;
            }
        }
        /**
         * Returns number of items (words) in the items array list.
         * @return Number of items (words) in the items array list.
         */
        size() {
            return this.items.length;
        }
    }
    exports.MultiWordLayer = MultiWordLayer;
});
//# sourceMappingURL=MultiWordLayer.js.map