import { utils } from 'ethers';
/**
 * @internal Intended for internal use - use it on your own risk
 */
export function warnOnInvalidCall(call) {
    if (!call) {
        return;
    }
    const { contract, method, args } = call;
    console.warn(`Invalid contract call: address=${contract.address} method=${method} args=${args}`);
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
export function encodeCallData(call, chainId, queryParams = {}) {
    var _a;
    if (!call) {
        return undefined;
    }
    const { contract, method, args } = call;
    if (!contract.address || !method) {
        warnOnInvalidCall(call);
        return undefined;
    }
    try {
        const isStatic = (_a = queryParams.isStatic) !== null && _a !== void 0 ? _a : queryParams.refresh === 'never';
        const refreshPerBlocks = typeof queryParams.refresh === 'number' ? queryParams.refresh : undefined;
        return {
            address: contract.address,
            data: contract.interface.encodeFunctionData(method, args),
            chainId,
            isStatic,
            refreshPerBlocks,
        };
    }
    catch (_b) {
        warnOnInvalidCall(call);
        return undefined;
    }
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
export function getUniqueActiveCalls(requests) {
    const unique = [];
    const used = {};
    for (const request of requests) {
        if (request.isDisabled) {
            continue;
        }
        if (!used[`${request.address.toLowerCase()}${request.data}${request.chainId}`]) {
            unique.push(request);
            used[`${request.address.toLowerCase()}${request.data}${request.chainId}`] = true;
        }
    }
    return unique;
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
export function decodeCallResult(call, result) {
    if (!result || !call) {
        return undefined;
    }
    const { value, success } = result;
    try {
        if (success) {
            return {
                value: call.contract.interface.decodeFunctionResult(call.method, value),
                error: undefined,
            };
        }
        else {
            const errorMessage = new utils.Interface(['function Error(string)']).decodeFunctionData('Error', value)[0];
            return {
                value: undefined,
                error: new Error(errorMessage),
            };
        }
    }
    catch (error) {
        return {
            value: undefined,
            error: error,
        };
    }
}
//# sourceMappingURL=calls.js.map