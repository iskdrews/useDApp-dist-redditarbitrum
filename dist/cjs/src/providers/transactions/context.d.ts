/// <reference types="react" />
import { StoredTransaction, StoredTransactions } from './model';
export declare const TransactionsContext: import("react").Context<{
    transactions: StoredTransactions;
    addTransaction: (payload: StoredTransaction) => void;
}>;
/**
 * @internal Intended for internal use - use it on your own risk
 */
export declare function useTransactionsContext(): {
    transactions: StoredTransactions;
    addTransaction: (payload: StoredTransaction) => void;
};
//# sourceMappingURL=context.d.ts.map