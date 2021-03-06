"use strict";
exports.__esModule = true;
exports.useBlockMeta = void 0;
var constants_1 = require("../constants");
var ethers_1 = require("ethers");
var useMulticallAddress_1 = require("./useMulticallAddress");
var useRawCalls_1 = require("./useRawCalls");
var useChainId_1 = require("./useChainId");
var GET_CURRENT_BLOCK_TIMESTAMP_CALL = constants_1.MultiCallABI.encodeFunctionData('getCurrentBlockTimestamp', []);
var GET_CURRENT_BLOCK_DIFFICULTY_CALL = constants_1.MultiCallABI.encodeFunctionData('getCurrentBlockDifficulty', []);
/**
 * Queries block metadata.
 * @public
 */
function useBlockMeta(queryParams) {
    if (queryParams === void 0) { queryParams = {}; }
    var chainId = (0, useChainId_1.useChainId)({ queryParams: queryParams });
    var address = (0, useMulticallAddress_1.useMulticallAddress)(queryParams);
    var timestamp = (0, useRawCalls_1.useRawCall)(address && chainId !== undefined && { address: address, data: GET_CURRENT_BLOCK_TIMESTAMP_CALL, chainId: chainId });
    var difficulty = (0, useRawCalls_1.useRawCall)(address && chainId !== undefined && { address: address, data: GET_CURRENT_BLOCK_DIFFICULTY_CALL, chainId: chainId });
    return {
        timestamp: timestamp !== undefined ? new Date(ethers_1.BigNumber.from(timestamp.value).mul(1000).toNumber()) : undefined,
        difficulty: difficulty !== undefined ? ethers_1.BigNumber.from(difficulty.value) : undefined
    };
}
exports.useBlockMeta = useBlockMeta;
//# sourceMappingURL=useBlockMeta.js.map