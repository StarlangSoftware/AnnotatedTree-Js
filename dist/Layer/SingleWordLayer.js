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
    exports.SingleWordLayer = void 0;
    const WordLayer_1 = require("./WordLayer");
    class SingleWordLayer extends WordLayer_1.WordLayer {
        setLayerValue(layerValue) {
            this.layerValue = layerValue;
        }
    }
    exports.SingleWordLayer = SingleWordLayer;
});
//# sourceMappingURL=SingleWordLayer.js.map