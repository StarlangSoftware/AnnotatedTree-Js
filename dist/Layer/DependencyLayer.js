"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyLayer = void 0;
const SingleWordLayer_1 = require("./SingleWordLayer");
class DependencyLayer extends SingleWordLayer_1.SingleWordLayer {
    /**
     * Constructor for the dependency layer. Dependency layer stores the dependency information of a node.
     * @param layerValue Value of the dependency layer.
     */
    constructor(layerValue) {
        super();
        this.layerName = "dependency";
        this.setLayerValue(layerValue);
    }
}
exports.DependencyLayer = DependencyLayer;
//# sourceMappingURL=DependencyLayer.js.map