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
    exports.ChunkType = void 0;
    var ChunkType;
    (function (ChunkType) {
        ChunkType[ChunkType["EXISTS"] = 0] = "EXISTS";
        ChunkType[ChunkType["NORMAL"] = 1] = "NORMAL";
        ChunkType[ChunkType["DETAILED"] = 2] = "DETAILED";
    })(ChunkType = exports.ChunkType || (exports.ChunkType = {}));
});
//# sourceMappingURL=ChunkType.js.map