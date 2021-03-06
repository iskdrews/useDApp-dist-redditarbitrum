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
exports.useContractFunction = exports.connectContractToSigner = void 0;
var useConfig_1 = require("./useConfig");
var react_1 = require("react");
var useEthers_1 = require("./useEthers");
var usePromiseTransaction_1 = require("./usePromiseTransaction");
/**
 * @internal Intended for internal use - use it on your own risk
 */
function connectContractToSigner(contract, options, library) {
    if (contract.signer) {
        return contract;
    }
    if (options === null || options === void 0 ? void 0 : options.signer) {
        return contract.connect(options.signer);
    }
    if (library === null || library === void 0 ? void 0 : library.getSigner()) {
        return contract.connect(library.getSigner());
    }
    throw new TypeError('No signer available in contract, options or library');
}
exports.connectContractToSigner = connectContractToSigner;
/**
 * Hook returns an object with four variables: ``state`` , ``send``, ``events`` , and ``resetState``.
 *
 * The `state` represents the status of transaction. See {@link TransactionStatus}.
 *
 * `resetState` can be used to reset the state to `None` after a transaction attempt has either succeeded or failed.
 *
 * The `events` is a array of parsed transaction events of type [LogDescription](https://docs.ethers.io/v5/api/utils/abi/interface/#LogDescription).
 *
 * To send a transaction use `send` function returned by `useContractFunction`.
 * The function forwards arguments to ethers.js contract object, so that arguments map 1 to 1 with Solidity function arguments.
 * Additionally, there can be one extra argument - [TransactionOverrides](https://docs.ethers.io/v5/api/contract/contract/#contract-functionsSend), which can be used to manipulate transaction parameters like gasPrice, nonce, etc
 *
 * If typechain contract is supplied as contract parameter then function name and send arguments will be type checked.
 * More on type checking [here](https://usedapp-docs.netlify.app/docs/Guides/Reading/Typechain).
 * @public
 * @param contract contract which function is to be called , also see [Contract](https://docs.ethers.io/v5/api/contract/contract/)
 * @param functionName name of function to call
 * @param options additional options of type {@link TransactionOptions}
 * @returns {} object with variables: `send` , `state` , `events`: `{ send: (...args: any[]) => void, state: TransactionStatus, events: LogDescription[] }`.
 *
 * @example
 * const { state, send } = useContractFunction(contract, 'deposit', { transactionName: 'Wrap' })
 *
 * const depositEther = (etherAmount: string) => {
 *   send({ value: utils.parseEther(etherAmount) })
 * }
 * @example
 * const { state, send } = useContractFunction(contract, 'withdraw', { transactionName: 'Unwrap' })
 *
 * const withdrawEther = (wethAmount: string) => {
 *   send(utils.parseEther(wethAmount))
 * }
 */
function useContractFunction(contract, functionName, options) {
    var _this = this;
    var _a = (0, useEthers_1.useEthers)(), library = _a.library, chainId = _a.chainId;
    var _b = (0, usePromiseTransaction_1.usePromiseTransaction)(chainId, options), promiseTransaction = _b.promiseTransaction, state = _b.state, resetState = _b.resetState;
    var _c = (0, react_1.useState)(undefined), events = _c[0], setEvents = _c[1];
    var _d = (0, useConfig_1.useConfig)().bufferGasLimitPercentage, bufferGasLimitPercentage = _d === void 0 ? 0 : _d;
    var send = (0, react_1.useCallback)(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(_this, void 0, void 0, function () {
            var hasOpts, contractWithSigner, opts, gasLimit, modifiedOpts, modifiedArgs, receipt, events_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!contract) return [3 /*break*/, 3];
                        hasOpts = args.length > ((_b = (_a = contract.interface) === null || _a === void 0 ? void 0 : _a.getFunction(functionName).inputs.length) !== null && _b !== void 0 ? _b : 0);
                        contractWithSigner = connectContractToSigner(contract, options, library);
                        opts = hasOpts ? args[args.length - 1] : undefined;
                        return [4 /*yield*/, (0, usePromiseTransaction_1.estimateContractFunctionGasLimit)(contractWithSigner, functionName, args, bufferGasLimitPercentage)];
                    case 1:
                        gasLimit = _c.sent();
                        modifiedOpts = __assign(__assign({}, opts), { gasLimit: gasLimit });
                        modifiedArgs = hasOpts ? args.slice(0, args.length - 1) : args;
                        modifiedArgs.push(modifiedOpts);
                        return [4 /*yield*/, promiseTransaction(contractWithSigner[functionName].apply(contractWithSigner, modifiedArgs))];
                    case 2:
                        receipt = _c.sent();
                        if (receipt === null || receipt === void 0 ? void 0 : receipt.logs) {
                            events_1 = receipt.logs.reduce(function (accumulatedLogs, log) {
                                try {
                                    return log.address.toLowerCase() === contract.address.toLowerCase()
                                        ? __spreadArray(__spreadArray([], accumulatedLogs, true), [contract.interface.parseLog(log)], false) : accumulatedLogs;
                                }
                                catch (_err) {
                                    return accumulatedLogs;
                                }
                            }, []);
                            setEvents(events_1);
                        }
                        return [2 /*return*/, receipt];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }, [contract, functionName, options, library]);
    return { send: send, state: state, events: events, resetState: resetState };
}
exports.useContractFunction = useContractFunction;
//# sourceMappingURL=useContractFunction.js.map