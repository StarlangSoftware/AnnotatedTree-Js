(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./SingleWordLayer", "nlptoolkit-namedentityrecognition/dist/NamedEntityTypeStatic"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NERLayer = void 0;
    const SingleWordLayer_1 = require("./SingleWordLayer");
    const NamedEntityTypeStatic_1 = require("nlptoolkit-namedentityrecognition/dist/NamedEntityTypeStatic");
    class NERLayer extends SingleWordLayer_1.SingleWordLayer {
        constructor(layerValue) {
            super();
            this.namedEntity = null;
            this.layerName = "namedEntity";
            this.setLayerValue(layerValue);
        }
        setLayerValue(layerValue) {
            this.layerValue = layerValue;
            this.namedEntity = NamedEntityTypeStatic_1.NamedEntityTypeStatic.getNamedEntityType(layerValue);
        }
        getLayerValue() {
            return NamedEntityTypeStatic_1.NamedEntityTypeStatic.getNamedEntity(this.namedEntity);
        }
    }
    exports.NERLayer = NERLayer;
});
//# sourceMappingURL=NERLayer.js.map