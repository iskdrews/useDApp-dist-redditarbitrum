import { Call } from '../hooks/useCall';
import { Awaited, ContractMethodNames, Falsy, TypedContract } from '../model/types';
import { RawCall, RawCallResult } from '../providers';
import { QueryParams } from '../constants/type/QueryParams';
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function warnOnInvalidCall(call: Call | Falsy): void;
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function encodeCallData(call: Call | Falsy, chainId: number, queryParams?: QueryParams): RawCall | Falsy;
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function getUniqueActiveCalls(requests: RawCall[]): RawCall[];
/**
 * Result of a multicall call.
 * @public
 */
export declare type CallResult<T extends TypedContract, MN extends ContractMethodNames<T>> = {
    value: Awaited<ReturnType<T['functions'][MN]>>;
    error: undefined;
} | {
    value: undefined;
    error: Error;
} | undefined;
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function decodeCallResult<T extends TypedContract, MN extends ContractMethodNames<T>>(call: Call | Falsy, result: RawCallResult): CallResult<T, MN>;
//# sourceMappingURL=calls.d.ts.map