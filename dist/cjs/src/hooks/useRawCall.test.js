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
var ethers_1 = require("ethers");
var chainId_1 = require("../constants/chainId");
var helpers_1 = require("../helpers");
var testing_1 = require("../testing");
var useRawCalls_1 = require("./useRawCalls");
describe('useRawCall', function () {
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
    it('can query ERC20 balance', function () { return __awaiter(void 0, void 0, void 0, function () {
        var call, _a, result, waitForCurrent;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    call = {
                        address: token.address,
                        data: token.interface.encodeFunctionData('balanceOf', [deployer.address]),
                        chainId: mockProvider.network.chainId
                    };
                    return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, useRawCalls_1.useRawCall)(call); }, {
                            mockProvider: mockProvider
                        })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val !== undefined; })];
                case 2:
                    _b.sent();
                    (0, chai_1.expect)(result.error).to.be.undefined;
                    (0, chai_1.expect)(result.current.success).to.eq(true);
                    (0, chai_1.expect)(result.current.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('Works for a different combinations of address casing', function () { return __awaiter(void 0, void 0, void 0, function () {
        var calls, _a, result, waitForCurrent;
        var _b, _c, _d, _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0:
                    calls = [
                        {
                            address: token.address.toLowerCase(),
                            data: token.interface.encodeFunctionData('balanceOf', [deployer.address.toLowerCase()]),
                            chainId: mockProvider.network.chainId
                        },
                        {
                            address: token.address.toLowerCase(),
                            data: token.interface.encodeFunctionData('balanceOf', [ethers_1.utils.getAddress(deployer.address)]),
                            chainId: mockProvider.network.chainId
                        },
                        {
                            address: ethers_1.utils.getAddress(token.address),
                            data: token.interface.encodeFunctionData('balanceOf', [deployer.address.toLowerCase()]),
                            chainId: mockProvider.network.chainId
                        },
                        {
                            address: ethers_1.utils.getAddress(token.address),
                            data: token.interface.encodeFunctionData('balanceOf', [ethers_1.utils.getAddress(deployer.address)]),
                            chainId: mockProvider.network.chainId
                        },
                    ];
                    return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, useRawCalls_1.useRawCalls)(calls); }, {
                            mockProvider: mockProvider
                        })];
                case 1:
                    _a = _k.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val !== undefined && val.every(function (x) { return x === null || x === void 0 ? void 0 : x.success; }); })];
                case 2:
                    _k.sent();
                    (0, chai_1.expect)(result.error).to.be.undefined;
                    (0, chai_1.expect)(result.current.length).to.eq(4);
                    (0, chai_1.expect)((_b = result.current[0]) === null || _b === void 0 ? void 0 : _b.success).to.be["true"];
                    (0, chai_1.expect)((_c = result.current[0]) === null || _c === void 0 ? void 0 : _c.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
                    (0, chai_1.expect)((_d = result.current[1]) === null || _d === void 0 ? void 0 : _d.success).to.be["true"];
                    (0, chai_1.expect)((_e = result.current[1]) === null || _e === void 0 ? void 0 : _e.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
                    (0, chai_1.expect)((_f = result.current[2]) === null || _f === void 0 ? void 0 : _f.success).to.be["true"];
                    (0, chai_1.expect)((_g = result.current[2]) === null || _g === void 0 ? void 0 : _g.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
                    (0, chai_1.expect)((_h = result.current[3]) === null || _h === void 0 ? void 0 : _h.success).to.be["true"];
                    (0, chai_1.expect)((_j = result.current[3]) === null || _j === void 0 ? void 0 : _j.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns correct initial balance for mainnet', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () {
                        return (0, useRawCalls_1.useRawCall)((0, helpers_1.encodeCallData)({
                            contract: token,
                            args: [deployer.address],
                            method: 'balanceOf'
                        }, chainId_1.ChainId.Localhost));
                    }, {
                        mockProvider: (_b = {},
                            _b[chainId_1.ChainId.Localhost] = mockProvider,
                            _b[testing_1.SECOND_TEST_CHAIN_ID] = secondMockProvider,
                            _b)
                    })];
                case 1:
                    _a = _c.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val !== undefined; })];
                case 2:
                    _c.sent();
                    (0, chai_1.expect)(result.error).to.be.undefined;
                    (0, chai_1.expect)(result.current.success).to.eq(true);
                    (0, chai_1.expect)(result.current.value).to.eq(testing_1.MOCK_TOKEN_INITIAL_BALANCE);
                    return [2 /*return*/];
            }
        });
    }); });
    it('returns correct initial balance for other chain', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () {
                        return (0, useRawCalls_1.useRawCall)((0, helpers_1.encodeCallData)({
                            contract: secondToken,
                            args: [secondDeployer.address],
                            method: 'balanceOf'
                        }, testing_1.SECOND_TEST_CHAIN_ID));
                    }, {
                        mockProvider: (_b = {},
                            _b[chainId_1.ChainId.Localhost] = mockProvider,
                            _b[testing_1.SECOND_TEST_CHAIN_ID] = secondMockProvider,
                            _b)
                    })];
                case 1:
                    _a = _c.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent;
                    return [4 /*yield*/, waitForCurrent(function (val) { return val !== undefined; })];
                case 2:
                    _c.sent();
                    (0, chai_1.expect)(result.error).to.be.undefined;
                    (0, chai_1.expect)(result.current.success).to.eq(true);
                    (0, chai_1.expect)(result.current.value).to.eq(testing_1.SECOND_MOCK_TOKEN_INITIAL_BALANCE);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=useRawCall.test.js.map