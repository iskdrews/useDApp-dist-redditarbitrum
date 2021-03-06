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
var useTokenAllowance_1 = require("./useTokenAllowance");
var ethers_1 = require("ethers");
describe('useTokenAllowance', function () {
    var mockProvider = new provider_1.MockProvider();
    var secondMockProvider = new provider_1.MockProvider({ ganacheOptions: { _chainIdRpc: testing_1.SECOND_TEST_CHAIN_ID } });
    var _a = mockProvider.getWallets(), deployer = _a[0], spender = _a[1];
    var _b = secondMockProvider.getWallets(), secondDeployer = _b[0], secondSpender = _b[1];
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
    it('returns 0 when spender is not yet approved', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, useTokenAllowance_1.useTokenAllowance)(token.address, deployer.address, spender.address); }, {
                        mockProvider: mockProvider
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val !== undefined; })];
                case 2:
                    _b.sent();
                    (0, chai_1.expect)(result.error).to.be.undefined;
                    (0, chai_1.expect)(result.current).to.eq(0);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns current allowance', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, token.approve(spender.address, ethers_1.utils.parseEther('1'))];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, useTokenAllowance_1.useTokenAllowance)(token.address, deployer.address, spender.address); }, {
                            mockProvider: mockProvider
                        })];
                case 2:
                    _a = _b.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val !== undefined; })];
                case 3:
                    _b.sent();
                    (0, chai_1.expect)(result.error).to.be.undefined;
                    (0, chai_1.expect)(result.current).to.eq(ethers_1.utils.parseEther('1'));
                    return [2 /*return*/];
            }
        });
    }); });
    it('multichain calls return correct initial balances', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testMultiChainUseTokenAllowance(token, deployer.address, spender.address, chainId_1.ChainId.Localhost, testing_1.MOCK_TOKEN_INITIAL_BALANCE.toString())];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, testMultiChainUseTokenAllowance(secondToken, secondDeployer.address, secondSpender.address, testing_1.SECOND_TEST_CHAIN_ID, testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE.toString())];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    var testMultiChainUseTokenAllowance = function (contract, user, spenderUser, chainId, allowance) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, contract.approve(spenderUser, ethers_1.utils.parseEther(allowance))];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, useTokenAllowance_1.useTokenAllowance)(contract.address, user, spenderUser, { chainId: chainId }); }, {
                            mockProvider: (_b = {},
                                _b[chainId_1.ChainId.Localhost] = mockProvider,
                                _b[testing_1.SECOND_TEST_CHAIN_ID] = secondMockProvider,
                                _b)
                        })];
                case 2:
                    _a = _c.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val !== undefined; })];
                case 3:
                    _c.sent();
                    (0, chai_1.expect)(result.error).to.be.undefined;
                    (0, chai_1.expect)(result.current).to.eq(ethers_1.utils.parseEther(allowance));
                    return [2 /*return*/];
            }
        });
    }); };
});
//# sourceMappingURL=useTokenAllowance.test.js.map