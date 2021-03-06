"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.ConfigProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var lodash_pickby_1 = __importDefault(require("lodash.pickby"));
var default_1 = require("../../model/config/default");
var context_1 = require("./context");
var reducer_1 = require("./reducer");
/**
 * We strip supplied config of undefined fields because it can easily break TS assumptions.
 *
 * Illustrative example:
 *
 * type FullConf = { something: string }
 * type PartConf = Partial<FullConf>
 *
 * const defaultConf: FullConf = { something: 'default' }
 * const suppliedConf: PartConf = { something: undefined }
 * const conf: FullConf = {...defaultConf, ...suppliedConf}
 * conf.something.toString() // OK according to TS, breaks on runtime.
 */
/**
 * @internal Intended for internal use - use it on your own risk
 */
var noUndefined = function (x) { return x !== undefined; };
function ConfigProvider(_a) {
    var config = _a.config, children = _a.children;
    var configWithDefaults = __assign(__assign(__assign({}, default_1.DEFAULT_CONFIG), (0, lodash_pickby_1["default"])(config, noUndefined)), { notifications: __assign(__assign({}, default_1.DEFAULT_CONFIG.notifications), (0, lodash_pickby_1["default"])(config.notifications, noUndefined)) });
    var _b = (0, react_1.useReducer)(reducer_1.configReducer, configWithDefaults), reducedConfig = _b[0], dispatch = _b[1];
    return (0, jsx_runtime_1.jsx)(context_1.ConfigContext.Provider, { value: { config: reducedConfig, updateConfig: dispatch }, children: children });
}
exports.ConfigProvider = ConfigProvider;
//# sourceMappingURL=provider.js.map