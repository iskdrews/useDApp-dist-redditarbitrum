"use strict";
exports.__esModule = true;
exports.MultiChainStateProvider = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var hooks_1 = require("../../../hooks");
var context_1 = require("./context");
var __1 = require("../../..");
var network_1 = require("../../network");
var fromEntries_1 = require("../../../helpers/fromEntries");
var performMulticall_1 = require("../common/performMulticall");
var common_1 = require("../common");
var helpers_1 = require("../../../helpers");
var useDevtoolsReporting_1 = require("../common/useDevtoolsReporting");
var useChainId_1 = require("../../../hooks/useChainId");
var context_2 = require("../../window/context");
function composeChainState(networks, state, multicallAddresses) {
    return (0, fromEntries_1.fromEntries)(Object.keys(networks).map(function (chainId) { return [
        Number(chainId),
        {
            value: state[Number(chainId)],
            multicallAddress: multicallAddresses[Number(chainId)]
        },
    ]; }));
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
function MultiChainStateProvider(_a) {
    var children = _a.children, multicallAddresses = _a.multicallAddresses;
    var _b = (0, __1.useConfig)(), multicallVersion = _b.multicallVersion, fastMulticallEncoding = _b.fastMulticallEncoding;
    var networks = (0, network_1.useReadonlyNetworks)();
    var blockNumbers = (0, hooks_1.useBlockNumbers)();
    var reportError = (0, __1.useNetwork)().reportError;
    var isActive = (0, context_2.useWindow)().isActive;
    var _c = (0, react_1.useReducer)(common_1.callsReducer, []), calls = _c[0], dispatchCalls = _c[1];
    var _d = (0, react_1.useReducer)(common_1.chainStateReducer, {}), state = _d[0], dispatchState = _d[1];
    var multicall = (multicallVersion === 1 ? common_1.multicall1Factory : common_1.multicall2Factory)(fastMulticallEncoding !== null && fastMulticallEncoding !== void 0 ? fastMulticallEncoding : false);
    var _e = (0, hooks_1.useDebouncePair)(calls, networks, 50), debouncedCalls = _e[0], debouncedNetworks = _e[1];
    var uniqueCalls = (0, react_1.useMemo)(function () { return (0, helpers_1.getUniqueActiveCalls)(debouncedCalls); }, [debouncedCalls]);
    // used for deep equality in hook dependencies
    var uniqueCallsJSON = JSON.stringify(debouncedCalls);
    var chainId = (0, useChainId_1.useChainId)();
    (0, useDevtoolsReporting_1.useDevtoolsReporting)(uniqueCallsJSON, uniqueCalls, chainId !== undefined ? blockNumbers[chainId] : undefined, multicallAddresses);
    function multicallForChain(chainId, provider) {
        if (!isActive) {
            return;
        }
        var blockNumber = blockNumbers[chainId];
        var multicallAddress = multicallAddresses[chainId];
        if (!provider || !blockNumber) {
            return;
        }
        if (!multicallAddress) {
            reportError(new Error("Missing multicall address for chain id ".concat(chainId)));
            return;
        }
        if (debouncedNetworks !== networks) {
            // Wait for debounce to catch up.
            return;
        }
        var callsOnThisChain = uniqueCalls.filter(function (call) { return call.chainId === chainId; });
        (0, performMulticall_1.performMulticall)(provider, multicall, multicallAddress, blockNumber, callsOnThisChain, dispatchState, chainId, reportError);
        dispatchCalls({ type: 'UPDATE_CALLS', calls: calls, blockNumber: blockNumber, chainId: chainId });
    }
    (0, react_1.useEffect)(function () {
        var _a, _b;
        for (var _i = 0, _c = Object.entries(networks); _i < _c.length; _i++) {
            var _d = _c[_i], _chainId = _d[0], provider = _d[1];
            var chainId_1 = Number(_chainId);
            // chainId is in provider is not the same as the chainId in the state wait for chainId to catch up
            if (chainId_1 === ((_a = provider.network) === null || _a === void 0 ? void 0 : _a.chainId) || chainId_1 === ((_b = provider._network) === null || _b === void 0 ? void 0 : _b.chainId)) {
                multicallForChain(chainId_1, provider);
            }
        }
    }, [blockNumbers, networks, multicallAddresses, uniqueCallsJSON]);
    var chains = (0, react_1.useMemo)(function () { return composeChainState(networks, state, multicallAddresses); }, [
        state,
        multicallAddresses,
        networks,
    ]);
    var provided = { chains: chains, dispatchCalls: dispatchCalls };
    return (0, jsx_runtime_1.jsx)(context_1.MultiChainStatesContext.Provider, { value: provided, children: children });
}
exports.MultiChainStateProvider = MultiChainStateProvider;
//# sourceMappingURL=provider.js.map