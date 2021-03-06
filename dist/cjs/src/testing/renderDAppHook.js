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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.renderDAppHook = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_hooks_1 = require("@testing-library/react-hooks");
var providers_1 = require("../providers");
var utils_1 = require("./utils");
/**
 * Next version of {@link renderWeb3Hook}.
 *
 * @internal
 * Internal until it's ready and stable.
 *
 * Differences from {@link renderWeb3Hook}:
 * The rendering happens at much higher level, closer to reality.
 * It takes a Config object and renders the hook under test in a `DAppProvider`,
 * which mimicks the real useDApp usage.
 *
 * @param hook Hook under test
 * @param options Optional options, same as in `renderHook`
 * @returns Same as in `renderHook`, with additions of helper functions.
 */
var renderDAppHook = function (hook, options) { return __awaiter(void 0, void 0, void 0, function () {
    var UserWrapper, _a, result, waitForNextUpdate, rerender, unmount;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        UserWrapper = (_c = (_b = options === null || options === void 0 ? void 0 : options.renderHook) === null || _b === void 0 ? void 0 : _b.wrapper) !== null && _c !== void 0 ? _c : utils_1.IdentityWrapper;
        _a = (0, react_hooks_1.renderHook)(hook, {
            wrapper: function (wrapperProps) {
                var _a;
                return ((0, jsx_runtime_1.jsx)(providers_1.DAppProvider, __assign({ config: (_a = options === null || options === void 0 ? void 0 : options.config) !== null && _a !== void 0 ? _a : {} }, { children: (0, jsx_runtime_1.jsx)(UserWrapper, __assign({}, wrapperProps)) })));
            },
            initialProps: (_d = options === null || options === void 0 ? void 0 : options.renderHook) === null || _d === void 0 ? void 0 : _d.initialProps
        }), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate, rerender = _a.rerender, unmount = _a.unmount;
        return [2 /*return*/, __assign({ result: result, rerender: rerender, unmount: unmount, 
                // do not return the waitFor* functions from `renderHook` - they are not usable after using waitForNextUpdate().
                waitForNextUpdate: waitForNextUpdate }, (0, utils_1.getWaitUtils)(result))];
    });
}); };
exports.renderDAppHook = renderDAppHook;
//# sourceMappingURL=renderDAppHook.js.map