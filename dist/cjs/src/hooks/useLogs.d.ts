import { Contract } from 'ethers';
import { ContractEventNames, Falsy, EventParams, TypedContract } from '../model/types';
import { LogsResult } from '../helpers';
import { LogQueryParams } from '../constants/type/QueryParams';
/**
 * @public
 */
export interface TypedFilter<T extends TypedContract = Contract, EN extends ContractEventNames<T> = ContractEventNames<T>> {
    contract: T;
    event: EN;
    args: EventParams<T, EN>;
}
/**
 * Makes a call to get the logs for a specific contract event and returns the decoded logs or an error if present.
 * The hook will cause the component to refresh when a new block is mined and the returned logs change.
 * A syntax sugar for {@link useRawLogs} that uses ABI, event name, and arguments instead of raw data.
 * @param filter an event filter (see {@link TypedFilter})
 * @param queryParams allows for additional configuration of the query (see {@link LogQueryParams})
 * @returns an array of decoded logs (see {@link LogsResult})
 * @public
 */
export declare function useLogs(filter: TypedFilter | Falsy, queryParams?: LogQueryParams): LogsResult<Contract, string>;
//# sourceMappingURL=useLogs.d.ts.map