"use strict";
exports.__esModule = true;
exports.decodeCallResult = exports.getUniqueActiveCalls = exports.encodeCallData = exports.warnOnInvalidCall = void 0;
var ethers_1 = require("ethers");
/**
 * @internal Intended for internal use - use it on your own risk
 */
function warnOnInvalidCall(call) {
    if (!call) {
        return;
    }
    var contract = call.contract, method = call.method, args = call.args;
    console.warn("Invalid contract call: address=".concat(contract.address, " method=").concat(method, " args=").concat(args));
}
exports.warnOnInvalidCall = warnOnInvalidCall;
/**
 * @internal Intended for internal use - use it on your own risk
 */
function encodeCallData(call, chainId, queryParams) {
    var _a;
    if (queryParams === void 0) { queryParams = {}; }
    if (!call) {
        return undefined;
    }
    var contract = call.contract, method = call.method, args = call.args;
    if (!contract.address || !method) {
        warnOnInvalidCall(call);
        return undefined;
    }
    try {
        var isStatic = (_a = queryParams.isStatic) !== null && _a !== void 0 ? _a : queryParams.refresh === 'never';
        var refreshPerBlocks = typeof queryParams.refresh === 'number' ? queryParams.refresh : undefined;
        return {
            address: contract.address,
            data: contract.interface.encodeFunctionData(method, args),
            chainId: chainId,
            isStatic: isStatic,
            refreshPerBlocks: refreshPerBlocks
        };
    }
    catch (_b) {
        warnOnInvalidCall(call);
        return undefined;
    }
}
exports.encodeCallData = encodeCallData;
/**
 * @internal Intended for internal use - use it on your own risk
 */
function getUniqueActiveCalls(requests) {
    var unique = [];
    var used = {};
    for (var _i = 0, requests_1 = requests; _i < requests_1.length; _i++) {
        var request = requests_1[_i];
        if (request.isDisabled) {
            continue;
        }
        if (!used["".concat(request.address.toLowerCase()).concat(request.data).concat(request.chainId)]) {
            unique.push(request);
            used["".concat(request.address.toLowerCase()).concat(request.data).concat(request.chainId)] = true;
        }
    }
    return unique;
}
exports.getUniqueActiveCalls = getUniqueActiveCalls;
/**
 * @internal Intended for internal use - use it on your own risk
 */
function decodeCallResult(call, result) {
    if (!result || !call) {
        return undefined;
    }
    var value = result.value, success = result.success;
    try {
        if (success) {
            return {
                value: call.contract.interface.decodeFunctionResult(call.method, value),
                error: undefined
            };
        }
        else {
            var errorMessage = new ethers_1.utils.Interface(['function Error(string)']).decodeFunctionData('Error', value)[0];
            return {
                value: undefined,
                error: new Error(errorMessage)
            };
        }
    }
    catch (error) {
        return {
            value: undefined,
            error: error
        };
    }
}
exports.decodeCallResult = decodeCallResult;
//# sourceMappingURL=calls.js.map