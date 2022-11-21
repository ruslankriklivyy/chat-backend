"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.ParseFormDataJsonPipe = void 0;
var deep_parse_json_1 = require("deep-parse-json");
var _ = require("lodash");
var ParseFormDataJsonPipe = /** @class */ (function () {
    function ParseFormDataJsonPipe(options) {
        this.options = options;
    }
    ParseFormDataJsonPipe.prototype.transform = function (value, _metadata) {
        var except = this.options.except;
        var serializedValue = value;
        var originProperties = {};
        if (except === null || except === void 0 ? void 0 : except.length) {
            _.merge(originProperties, _.pick.apply(_, __spreadArray([serializedValue], except, false)));
        }
        var deserializedValue = (0, deep_parse_json_1.deepParseJson)(value);
        return deserializedValue;
    };
    return ParseFormDataJsonPipe;
}());
exports.ParseFormDataJsonPipe = ParseFormDataJsonPipe;
