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
exports.__esModule = true;
var provider_1 = require("@ethereum-waffle/provider");
var chai_1 = require("chai");
var testing_1 = require("../testing");
var chainId_1 = require("../constants/chainId");
var abi_1 = require("../constants/abi");
var useContractCall_1 = require("./useContractCall");
describe('useContractCall', function () {
    var mockProvider = new provider_1.MockProvider();
    var secondMockProvider = new provider_1.MockProvider({ ganacheOptions: { _chainIdRpc: testing_1.SECOND_TEST_CHAIN_ID } });
    var deployer = mockProvider.getWallets()[0];
    var secondDeployer = secondMockProvider.getWallets()[0];
    var token;
    var secondToken;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, testing_1.deployMockToken)(deployer)];
                case 1:
                    token = _a.sent();
                    return [4 /*yield*/, (0, testing_1.deployMockToken)(secondDeployer, testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE)];
                case 2:
                    secondToken = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('initial test balance to be correct', function () { return __awaiter(void 0, void 0, void 0, function () {
        var callData, _a, result, waitForCurrent;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    callData = {
                        abi: abi_1.ERC20Interface,
                        address: token.address,
                        method: 'balanceOf',
                        args: [deployer.address]
                    };
                    return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, useContractCall_1.useContractCall)(callData, { chainId: chainId_1.ChainId.Localhost }); }, {
                            mockProvider: mockProvider
                        })];
                case 1:
                    _a = _d.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val !== undefined; })];
                case 2:
                    _d.sent();
                    (0, chai_1.expect)(result.error).to.be.undefined;
                    (0, chai_1.expect)((_b = result.current) === null || _b === void 0 ? void 0 : _b[0]).not.to.be.undefined;
                    (0, chai_1.expect)((_c = result.current) === null || _c === void 0 ? void 0 : _c[0]).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('multichain calls return correct initial balances', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testMultiChainUseContractCall(token.address, [deployer.address], chainId_1.ChainId.Localhost, testing_1.MOCK_TOKEN_INITIAL_BALANCE)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, testMultiChainUseContractCall(secondToken.address, [secondDeployer.address], testing_1.SECOND_TEST_CHAIN_ID, testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var testMultiChainUseContractCall = function (address, args, chainId, endValue) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent;
        var _b;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () {
                        return (0, useContractCall_1.useContractCall)({
                            abi: abi_1.ERC20Interface,
                            address: address,
                            method: 'balanceOf',
                            args: args
                        }, { chainId: chainId });
                    }, {
                        mockProvider: (_b = {},
                            _b[chainId_1.ChainId.Localhost] = mockProvider,
                            _b[testing_1.SECOND_TEST_CHAIN_ID] = secondMockProvider,
                            _b)
                    })];
                case 1:
                    _a = _e.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val !== undefined; })];
                case 2:
                    _e.sent();
                    (0, chai_1.expect)(result.error).to.be.undefined;
                    (0, chai_1.expect)((_c = result.current) === null || _c === void 0 ? void 0 : _c[0]).not.to.be.undefined;
                    (0, chai_1.expect)((_d = result.current) === null || _d === void 0 ? void 0 : _d[0]).to.eq(endValue);
                    return [2 /*return*/];
            }
        });
    }); };
    it('is prepared for a case of undefined address', function () { return __awaiter(void 0, void 0, void 0, function () {
        var callData, _a, result, waitForNextUpdate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    callData = {
                        abi: abi_1.ERC20Interface,
                        address: undefined,
                        method: 'balanceOf',
                        args: [deployer.address]
                    };
                    return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, useContractCall_1.useContractCall)(callData, { chainId: chainId_1.ChainId.Localhost }); }, {
                            mockProvider: mockProvider
                        })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate;
                    return [4 /*yield*/, waitForNextUpdate()];
                case 2:
                    _b.sent();
                    (0, chai_1.expect)(result.error).to.be.undefined;
                    (0, chai_1.expect)(result.current).to.be.undefined;
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=useContractCall.test.js.map