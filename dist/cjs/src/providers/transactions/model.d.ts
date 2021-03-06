import type { TransactionReceipt, TransactionResponse } from '@ethersproject/abstract-provider';
/**
 * @public
 */
export interface StoredTransaction {
    transaction: TransactionResponse;
    submittedAt: number;
    receipt?: TransactionReceipt;
    lastCheckedBlockNumber?: number;
    transactionName?: string;
    originalTransaction?: TransactionResponse;
}
/**
 * @public
 */
export declare function getStoredTransactionState(transaction: StoredTransaction): "Mining" | "Success" | "Fail";
/**
 * @public
 */
export declare type StoredTransactions = {
    [chainID: number]: StoredTransaction[];
};
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare const DEFAULT_STORED_TRANSACTIONS: StoredTransactions;
//# sourceMappingURL=model.d.ts.map