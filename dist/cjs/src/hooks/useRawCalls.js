"use strict";
exports.__esModule = true;
exports.useRawCall = exports.useRawCalls = void 0;
var react_1 = require("react");
var providers_1 = require("../providers");
/**
 * A low-level function that makes multiple calls to specific methods of specific contracts and returns values or error if present.
 * The hook will cause the component to refresh when values change.
 *
 * Calls will be combined into a single multicall across all uses of {@link useChainCall}, {@link useChainCalls}, {@link useRawCall} and {@link useRawCalls}.
 * It is recommended to use {@link useCalls} where applicable instead of this method.
 * @public
 * @param calls List of calls, also see {@link RawCall}. Calls need to be in the same order across component renders.
 * @returns list of multicall calls. See {@link RawCallResult} and {@link useRawCall}.
 */
function useRawCalls(calls) {
    var _a = (0, react_1.useContext)(providers_1.MultiChainStatesContext), dispatchCalls = _a.dispatchCalls, chains = _a.chains;
    (0, react_1.useEffect)(function () {
        var filteredCalls = calls.filter(Boolean);
        dispatchCalls({ type: 'ADD_CALLS', calls: filteredCalls });
        return function () { return dispatchCalls({ type: 'REMOVE_CALLS', calls: filteredCalls }); };
    }, [JSON.stringify(calls), dispatchCalls]);
    return (0, react_1.useMemo)(function () {
        return calls.map(function (call) {
            return call ? extractCallResult(chains, call) : undefined;
        });
    }, [JSON.stringify(calls), chains]);
}
exports.useRawCalls = useRawCalls;
/**
 * A low-level function that makes a call to a specific method of a specific contract and returns the value or error if present.
 * The hook will cause the component to refresh whenever a new block is mined and the value is changed.
 *
 * Calls will be combined into a single multicall across all uses of {@link useChainCall}, {@link useChainCalls}, {@link useRawCall} and {@link useRawCalls}.
 * It is recommended to use {@link useCall} where applicable instead of this method.
 *
 * @param call a single call, also see {@link RawCall}.
 *             A call can be Falsy, as it is important to keep the same ordering of hooks even if in a given render cycle
 *             and there might be not enough information to perform a call.
 * @public
 * @returns result of multicall call.
 *   The hook returns {@link RawCallResult} type.
 *   That is: `undefined` when call didn't return yet or object `{ success: boolean, value: string }` if it did,
 *   `success` - boolean indicating whether call was successful or not,
 *   `value` - encoded result when success is `true` or encoded error message when success is `false`.
 */
function useRawCall(call) {
    return useRawCalls([call])[0];
}
exports.useRawCall = useRawCall;
function extractCallResult(chains, call) {
    var _a, _b, _c, _d;
    var chainId = call.chainId;
    return chainId !== undefined ? (_d = (_c = (_b = (_a = chains[chainId]) === null || _a === void 0 ? void 0 : _a.value) === null || _b === void 0 ? void 0 : _b.state) === null || _c === void 0 ? void 0 : _c[call.address.toLowerCase()]) === null || _d === void 0 ? void 0 : _d[call.data] : undefined;
}
//# sourceMappingURL=useRawCalls.js.map