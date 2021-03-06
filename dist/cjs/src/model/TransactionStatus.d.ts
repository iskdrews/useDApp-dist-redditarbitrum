import type { TransactionResponse, TransactionReceipt } from '@ethersproject/abstract-provider';
/**
 * @public
 */
export declare type TransactionState = 'None' | 'PendingSignature' | 'Mining' | 'Success' | 'Fail' | 'Exception';
/**
 * @public
 */
export interface TransactionStatus {
    status: TransactionState;
    transaction?: TransactionResponse;
    receipt?: TransactionReceipt;
    chainId?: number;
    errorMessage?: string;
    errorCode?: number;
    originalTransaction?: TransactionResponse;
}
/**
 * @public
 */
export declare function transactionErrored(transaction: TransactionStatus): boolean;
//# sourceMappingURL=TransactionStatus.d.ts.map