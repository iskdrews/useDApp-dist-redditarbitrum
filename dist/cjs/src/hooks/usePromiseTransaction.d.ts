import type { TransactionRequest, TransactionResponse } from '@ethersproject/abstract-provider';
import { TransactionStatus, TransactionOptions } from '../model';
import { BigNumber, Contract, Signer } from 'ethers';
/**
 * @internal
 */
export declare function estimateTransactionGasLimit(transactionRequest: TransactionRequest | undefined, signer: Signer | undefined, bufferGasLimitPercentage: number): Promise<BigNumber | undefined>;
/**
 * @internal
 */
export declare function estimateContractFunctionGasLimit(contractWithSigner: Contract, functionName: string, args: any[], bufferGasLimitPercentage: number): Promise<BigNumber | undefined>;
export declare function usePromiseTransaction(chainId: number | undefined, options?: TransactionOptions): {
    promiseTransaction: (transactionPromise: Promise<TransactionResponse>) => Promise<import("@ethersproject/abstract-provider").TransactionReceipt | undefined>;
    state: TransactionStatus;
    resetState: () => void;
};
//# sourceMappingURL=usePromiseTransaction.d.ts.map