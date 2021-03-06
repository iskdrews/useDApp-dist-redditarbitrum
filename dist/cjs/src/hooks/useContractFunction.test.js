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
var src_1 = require("../../src");
var chai_1 = require("chai");
var ethereum_waffle_1 = require("ethereum-waffle");
var ethers_1 = require("ethers");
var testing_1 = require("../../src/testing");
var renderDAppHook_1 = require("../testing/renderDAppHook");
var CONTRACT_FUNCTION_COST = 51941; // mock transfer transaction cost
describe('useContractFunction', function () {
    var mockProvider = new ethereum_waffle_1.MockProvider();
    var _a = mockProvider.getWallets(), deployer = _a[0], spender = _a[1];
    var token;
    var config;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ;
                    return [4 /*yield*/, (0, testing_1.setupTestingConfig)()];
                case 1:
                    (config = (_a.sent()).config);
                    return [4 /*yield*/, (0, testing_1.deployMockToken)(deployer)];
                case 2:
                    token = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('success', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent, waitForNextUpdate, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, src_1.useContractFunction)(token, 'approve'); }, {
                        mockProvider: mockProvider
                    })];
                case 1:
                    _a = _c.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent, waitForNextUpdate = _a.waitForNextUpdate;
                    return [4 /*yield*/, waitForNextUpdate()];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, result.current.send(spender.address, 200)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.state !== undefined; })];
                case 4:
                    _c.sent();
                    (0, chai_1.expect)(result.current.state.status).to.eq('Success');
                    _b = chai_1.expect;
                    return [4 /*yield*/, token.allowance(deployer.address, spender.address)];
                case 5:
                    _b.apply(void 0, [_c.sent()]).to.eq(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it('events', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent, waitForNextUpdate, event;
        var _b, _c, _d, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, src_1.useContractFunction)(token, 'approve'); }, {
                        mockProvider: mockProvider
                    })];
                case 1:
                    _a = _f.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent, waitForNextUpdate = _a.waitForNextUpdate;
                    return [4 /*yield*/, waitForNextUpdate()];
                case 2:
                    _f.sent();
                    return [4 /*yield*/, result.current.send(spender.address, 200)];
                case 3:
                    _f.sent();
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.state !== undefined; })];
                case 4:
                    _f.sent();
                    (0, chai_1.expect)((_c = (_b = result.current) === null || _b === void 0 ? void 0 : _b.events) === null || _c === void 0 ? void 0 : _c.length).to.eq(1);
                    event = (_e = (_d = result.current) === null || _d === void 0 ? void 0 : _d.events) === null || _e === void 0 ? void 0 : _e[0];
                    (0, chai_1.expect)(event === null || event === void 0 ? void 0 : event.name).to.eq('Approval');
                    (0, chai_1.expect)(event === null || event === void 0 ? void 0 : event.args['owner']).to.eq(deployer.address);
                    (0, chai_1.expect)(event === null || event === void 0 ? void 0 : event.args['spender']).to.eq(spender.address);
                    (0, chai_1.expect)(event === null || event === void 0 ? void 0 : event.args['value']).to.eq(ethers_1.BigNumber.from(200));
                    return [2 /*return*/];
            }
        });
    }); });
    it('exception (bad arguments)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent, waitForNextUpdate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, src_1.useContractFunction)(token, 'approve'); }, {
                        mockProvider: mockProvider
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent, waitForNextUpdate = _a.waitForNextUpdate;
                    return [4 /*yield*/, waitForNextUpdate()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, result.current.send()];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.state !== undefined; })];
                case 4:
                    _b.sent();
                    (0, chai_1.expect)(result.current.state.status).to.eq('Exception');
                    if (result.current.state.status === 'Exception') {
                        (0, chai_1.expect)(result.current.state.errorMessage).to.eq('missing argument: passed to contract');
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('fail (when transaction reverts)', function () { return __awaiter(void 0, void 0, void 0, function () {
        var contractMock, _a, result, waitForCurrent, waitForNextUpdate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    contractMock = testing_1.contractCallOutOfGasMock;
                    return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, src_1.useContractFunction)(contractMock, 'transfer'); }, {
                            mockProvider: mockProvider
                        })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent, waitForNextUpdate = _a.waitForNextUpdate;
                    return [4 /*yield*/, waitForNextUpdate()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, result.current.send(spender.address, 10)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.state !== undefined; })];
                case 4:
                    _b.sent();
                    (0, chai_1.expect)(result.current.state.status).to.eq('Fail');
                    if (result.current.state.status === 'Fail') {
                        (0, chai_1.expect)(result.current.state.errorMessage).to.eq('out of gas');
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    it('should not throw error when contract is Falsy', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForNextUpdate;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, src_1.useContractFunction)(null, 'approve'); }, {
                        mockProvider: mockProvider
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForNextUpdate = _a.waitForNextUpdate;
                    return [4 /*yield*/, waitForNextUpdate()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, result.current.send(spender.address, 200)];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it('transfer amount with limit', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent, waitForNextUpdate, startingBalance, finalBalance, txCost;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, (0, renderDAppHook_1.renderDAppHook)(function () { return (0, src_1.useContractFunction)(token, 'transfer'); }, {
                        config: __assign(__assign({}, config), { bufferGasLimitPercentage: 100 })
                    })];
                case 1:
                    _a = _b.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent, waitForNextUpdate = _a.waitForNextUpdate;
                    return [4 /*yield*/, waitForNextUpdate()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, deployer.getBalance()];
                case 3:
                    startingBalance = _b.sent();
                    return [4 /*yield*/, result.current.send(spender.address, 200)];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.state !== undefined; })];
                case 5:
                    _b.sent();
                    (0, chai_1.expect)(result.current.state.status).to.eq('Success');
                    return [4 /*yield*/, deployer.getBalance()];
                case 6:
                    finalBalance = _b.sent();
                    txCost = finalBalance.sub(startingBalance);
                    (0, chai_1.expect)(txCost).to.be.at.most(2 * CONTRACT_FUNCTION_COST);
                    return [2 /*return*/];
            }
        });
    }); });
    it('success with correct receipt', function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, result, waitForCurrent, waitForNextUpdate, _b;
        var _c, _d, _e, _f, _g, _h, _j;
        return __generator(this, function (_k) {
            switch (_k.label) {
                case 0: return [4 /*yield*/, (0, testing_1.renderWeb3Hook)(function () { return (0, src_1.useContractFunction)(token, 'approve'); }, {
                        mockProvider: mockProvider
                    })];
                case 1:
                    _a = _k.sent(), result = _a.result, waitForCurrent = _a.waitForCurrent, waitForNextUpdate = _a.waitForNextUpdate;
                    return [4 /*yield*/, waitForNextUpdate()];
                case 2:
                    _k.sent();
                    return [4 /*yield*/, result.current.send(spender.address, 200)];
                case 3:
                    _k.sent();
                    return [4 /*yield*/, waitForCurrent(function (val) { return val.state !== undefined; })];
                case 4:
                    _k.sent();
                    (0, chai_1.expect)(result.current.state.status).to.eq('Success');
                    _b = chai_1.expect;
                    return [4 /*yield*/, token.allowance(deployer.address, spender.address)];
                case 5:
                    _b.apply(void 0, [_k.sent()]).to.eq(200);
                    (0, chai_1.expect)(result.current.state.receipt).to.not.be.undefined;
                    (0, chai_1.expect)((_c = result.current.state.receipt) === null || _c === void 0 ? void 0 : _c.to).to.eq(token.address);
                    (0, chai_1.expect)((_d = result.current.state.receipt) === null || _d === void 0 ? void 0 : _d.from).to.eq(deployer.address);
                    (0, chai_1.expect)((_e = result.current.state.receipt) === null || _e === void 0 ? void 0 : _e.gasUsed).to.be.gt(0);
                    (0, chai_1.expect)((_f = result.current.state.receipt) === null || _f === void 0 ? void 0 : _f.status).to.eq(1);
                    (0, chai_1.expect)((_g = result.current.state.receipt) === null || _g === void 0 ? void 0 : _g.blockHash).to.match(/^0x/);
                    (0, chai_1.expect)((_h = result.current.state.receipt) === null || _h === void 0 ? void 0 : _h.transactionHash).to.match(/^0x/);
                    (0, chai_1.expect)((_j = result.current.state.receipt) === null || _j === void 0 ? void 0 : _j.gasUsed).to.be.gt(0);
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=useContractFunction.test.js.map