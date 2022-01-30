(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SingleWordLayer"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DependencyLayer = void 0;
    const SingleWordLayer_1 = require("./SingleWordLayer");
    class DependencyLayer extends SingleWordLayer_1.SingleWordLayer {
        constructor(layerValue) {
            super();
            this.layerName = "dependency";
            this.setLayerValue(layerValue);
        }
    }
    exports.DependencyLayer = DependencyLayer;
});
//# sourceMappingURL=DependencyLayer.js.map