"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.NetworkProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var context_1 = require("./context");
var reducer_1 = require("./reducer");
var ethers_1 = require("ethers");
var helpers_1 = require("../../../helpers");
var hooks_1 = require("../../../hooks");
var detect_provider_1 = __importDefault(require("@metamask/detect-provider"));
var Provider = ethers_1.providers.Provider;
var Web3Provider = ethers_1.providers.Web3Provider;
function tryToGetAccount(provider) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, provider.getSigner().getAddress()];
                case 1: return [2 /*return*/, _a.sent()];
                case 2:
                    err_1 = _a.sent();
                    if (err_1.code === 'UNSUPPORTED_OPERATION') {
                        // readonly provider
                        return [2 /*return*/, undefined];
                    }
                    throw err_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
function NetworkProvider(_a) {
    var _this = this;
    var children = _a.children, providerOverride = _a.providerOverride;
    var _b = (0, hooks_1.useConfig)(), autoConnect = _b.autoConnect, pollingInterval = _b.pollingInterval, noMetamaskDeactivate = _b.noMetamaskDeactivate;
    var _c = (0, react_1.useReducer)(reducer_1.networksReducer, reducer_1.defaultNetworkState), network = _c[0], dispatch = _c[1];
    var _d = (0, react_1.useState)(function () { return function () { return undefined; }; }), onUnsubscribe = _d[0], setOnUnsubscribe = _d[1];
    var _e = (0, hooks_1.useLocalStorage)('shouldConnectMetamask'), shouldConnectMetamask = _e[0], setShouldConnectMetamask = _e[1];
    var _f = (0, react_1.useState)(false), isLoading = _f[0], setLoading = _f[1];
    var activateBrowserWallet = (0, react_1.useCallback)(function () { return __awaiter(_this, void 0, void 0, function () {
        var injectedProvider, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoading(true);
                    return [4 /*yield*/, (0, helpers_1.getInjectedProvider)(pollingInterval)];
                case 1:
                    injectedProvider = _a.sent();
                    if (!injectedProvider) {
                        reportError(new Error('No injected provider available'));
                        setLoading(false);
                        console.error('No injected provider available'); // we do not want to crash the app when there is no metamask
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, 5, 6]);
                    return [4 /*yield*/, injectedProvider.send('eth_requestAccounts', [])];
                case 3:
                    _a.sent();
                    setShouldConnectMetamask(true);
                    return [3 /*break*/, 6];
                case 4:
                    err_2 = _a.sent();
                    reportError(err_2);
                    setShouldConnectMetamask(false);
                    throw err_2;
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/, activate(injectedProvider)];
            }
        });
    }); }, []);
    (0, react_1.useEffect)(function () {
        if (providerOverride) {
            void activate(providerOverride);
        }
    }, [providerOverride]);
    var update = (0, react_1.useCallback)(function (newNetwork) {
        dispatch({ type: 'UPDATE_NETWORK', network: newNetwork });
    }, [network]);
    var reportError = (0, react_1.useCallback)(function (error) {
        console.error(error);
        dispatch({ type: 'ADD_ERROR', error: error });
    }, []);
    var deactivate = (0, react_1.useCallback)(function () {
        setShouldConnectMetamask(false);
        update({
            accounts: []
        });
    }, []);
    var onDisconnect = (0, react_1.useCallback)(function (provider) { return function (error) {
        var isMetaMask = provider.provider.isMetaMask;
        if (!noMetamaskDeactivate || !isMetaMask) {
            reportError(error);
            deactivate();
        }
    }; }, []);
    (0, react_1.useEffect)(function () {
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            var err_3;
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 4, , 5]);
                        if (!(shouldConnectMetamask && autoConnect && !providerOverride)) return [3 /*break*/, 3];
                        return [4 /*yield*/, (0, detect_provider_1["default"])()
                            // If window.ethereum._state.accounts is non null but has no items,
                            // it probably means that the user has disconnected Metamask manually.
                        ];
                    case 1:
                        _d.sent();
                        // If window.ethereum._state.accounts is non null but has no items,
                        // it probably means that the user has disconnected Metamask manually.
                        if (shouldConnectMetamask && ((_c = (_b = (_a = window.ethereum) === null || _a === void 0 ? void 0 : _a._state) === null || _b === void 0 ? void 0 : _b.accounts) === null || _c === void 0 ? void 0 : _c.length) === 0) {
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, activateBrowserWallet()];
                    case 2:
                        _d.sent();
                        _d.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_3 = _d.sent();
                        console.warn(err_3);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); });
    }, [shouldConnectMetamask, autoConnect, providerOverride]);
    var activate = (0, react_1.useCallback)(function (provider) { return __awaiter(_this, void 0, void 0, function () {
        var wrappedProvider, account, chainId, clearSubscriptions_1, err_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    wrappedProvider = Provider.isProvider(provider) ? provider : new Web3Provider(provider);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    setLoading(true);
                    return [4 /*yield*/, tryToGetAccount(wrappedProvider)];
                case 2:
                    account = _b.sent();
                    return [4 /*yield*/, wrappedProvider.getNetwork()];
                case 3:
                    chainId = (_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.chainId;
                    onUnsubscribe();
                    clearSubscriptions_1 = (0, helpers_1.subscribeToProviderEvents)(wrappedProvider.provider, update, onDisconnect(wrappedProvider));
                    setOnUnsubscribe(function () { return clearSubscriptions_1; });
                    update({
                        provider: wrappedProvider,
                        chainId: chainId,
                        accounts: account ? [account] : []
                    });
                    return [3 /*break*/, 6];
                case 4:
                    err_4 = _b.sent();
                    reportError(err_4);
                    throw err_4;
                case 5:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [onUnsubscribe]);
    return ((0, jsx_runtime_1.jsx)(context_1.NetworkContext.Provider, { value: { network: network, update: update, activate: activate, deactivate: deactivate, reportError: reportError, activateBrowserWallet: activateBrowserWallet, isLoading: isLoading }, children: children }));
}
exports.NetworkProvider = NetworkProvider;
//# sourceMappingURL=provider.js.map