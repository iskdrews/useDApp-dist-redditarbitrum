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
exports.useSendTransaction = void 0;
var useConfig_1 = require("./useConfig");
var useEthers_1 = require("./useEthers");
var usePromiseTransaction_1 = require("./usePromiseTransaction");
/**
 * Hook returns an object with three variables: `state`, `resetState`, and `sendTransaction`.
 *
 * ``state` represents the status of transaction. See {@link TransactionStatus}.
 *
 * `resetState` can be used to reset the state to `None` after a transaction attempt has either succeeded or failed.
 *
 * To send a transaction use `sendTransaction` function returned by `useSendTransaction`.
 *
 * Function accepts a [Transaction Request](https://docs.ethers.io/v5/api/providers/types/#providers-TransactionRequest) object as a parameter.
 * @public
 * @param options additional options of type {@link TransactionOptions}
 * @returns {} object with two variables: `sendTransaction` and `state`: `{ sendTransaction: (...args: any[]) => void, state: TransactionStatus }`.
 *
 * @example
 * const { sendTransaction, state } = useSendTransaction({ transactionName: 'Send Ethereum' })
 *
 * const handleClick = () => {
 *   ...
 *   sendTransaction({ to: address, value: utils.parseEther(amount) })
 * }
 */
function useSendTransaction(options) {
    var _this = this;
    var _a = (0, useEthers_1.useEthers)(), library = _a.library, chainId = _a.chainId;
    var _b = (0, usePromiseTransaction_1.usePromiseTransaction)(chainId, options), promiseTransaction = _b.promiseTransaction, state = _b.state, resetState = _b.resetState;
    var _c = (0, useConfig_1.useConfig)().bufferGasLimitPercentage, bufferGasLimitPercentage = _c === void 0 ? 0 : _c;
    var sendTransaction = function (transactionRequest) { return __awaiter(_this, void 0, void 0, function () {
        var signer, gasLimit;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    signer = (options === null || options === void 0 ? void 0 : options.signer) || (library === null || library === void 0 ? void 0 : library.getSigner());
                    if (!signer) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, usePromiseTransaction_1.estimateTransactionGasLimit)(transactionRequest, signer, bufferGasLimitPercentage)];
                case 1:
                    gasLimit = _a.sent();
                    return [2 /*return*/, promiseTransaction(signer.sendTransaction(__assign(__assign({}, transactionRequest), { gasLimit: gasLimit })))];
                case 2: return [2 /*return*/];
            }
        });
    }); };
    return { sendTransaction: sendTransaction, state: state, resetState: resetState };
}
exports.useSendTransaction = useSendTransaction;
//# sourceMappingURL=useSendTransaction.js.map