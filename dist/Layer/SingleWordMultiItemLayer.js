"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleWordMultiItemLayer = void 0;
const SingleWordLayer_1 = require("./SingleWordLayer");
class SingleWordMultiItemLayer extends SingleWordLayer_1.SingleWordLayer {
    items = new Array();
    getItemAt(index) {
        if (index < this.items.length) {
            return this.items[index];
        }
        else {
            return undefined;
        }
    }
    getLayerSize(viewLayer) {
        return this.items.length;
    }
}
exports.SingleWordMultiItemLayer = SingleWordMultiItemLayer;
//# sourceMappingURL=SingleWordMultiItemLayer.js.map