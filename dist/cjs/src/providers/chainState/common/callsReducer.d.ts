import { ChainId } from '../../..';
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare type Action = AddCall | RemoveCall | UpdateCall;
/**
 * @public
 */
export interface RawCall {
    chainId: ChainId;
    address: string;
    data: string;
    isStatic?: boolean;
    isDisabled?: boolean;
    lastUpdatedBlockNumber?: number;
    refreshPerBlocks?: number;
}
/**
 * @deprecated It's recommended to use RawCall instead
 * @internal Intended for internal use - use it on your own risk
 */
export interface ChainCall {
    chainId?: ChainId;
    address: string;
    data: string;
}
interface AddCall {
    type: 'ADD_CALLS';
    calls: RawCall[];
}
interface UpdateCall {
    type: 'UPDATE_CALLS';
    calls: RawCall[];
    blockNumber: number;
    chainId: number;
}
interface RemoveCall {
    type: 'REMOVE_CALLS';
    calls: RawCall[];
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function callsReducer(state: RawCall[] | undefined, action: Action): RawCall[];
export {};
//# sourceMappingURL=callsReducer.d.ts.map