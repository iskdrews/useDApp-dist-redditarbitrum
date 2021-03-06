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
exports.callsReducer = void 0;
/**
 * @internal Intended for internal use - use it on your own risk
 */
function callsReducer(state, action) {
    if (state === void 0) { state = []; }
    if (action.type === 'ADD_CALLS') {
        return __spreadArray(__spreadArray([], state, true), action.calls.map(function (call) { return (__assign(__assign({}, call), { address: call.address.toLowerCase() })); }), true);
    }
    else if (action.type === 'UPDATE_CALLS') {
        return state.map(function (call) {
            if (call.chainId !== action.chainId) {
                return call;
            }
            var blockNumber = action.blockNumber;
            if (call.refreshPerBlocks && call.lastUpdatedBlockNumber) {
                return call.lastUpdatedBlockNumber + call.refreshPerBlocks === blockNumber
                    ? __assign(__assign({}, call), { lastUpdatedBlockNumber: blockNumber, isDisabled: false }) : __assign(__assign({}, call), { isDisabled: true });
            }
            return call.isStatic
                ? __assign(__assign({}, call), { isDisabled: true }) : __assign(__assign({}, call), { lastUpdatedBlockNumber: blockNumber, isDisabled: call.refreshPerBlocks !== undefined ? true : false });
        });
    }
    else {
        var finalState = state;
        var _loop_1 = function (call) {
            var index = finalState.findIndex(function (x) { return x.address.toLowerCase() === call.address.toLowerCase() && x.data === call.data; });
            if (index !== -1) {
                finalState = finalState.filter(function (_, i) { return i !== index; });
            }
        };
        for (var _i = 0, _a = action.calls; _i < _a.length; _i++) {
            var call = _a[_i];
            _loop_1(call);
        }
        return finalState;
    }
}
exports.callsReducer = callsReducer;
//# sourceMappingURL=callsReducer.js.map