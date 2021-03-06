import { useCallback, useState } from 'react';
import { useNotificationsContext, useTransactionsContext } from '../providers';
import { BigNumber, errors } from 'ethers';
/**
 * @internal
 */
export async function estimateTransactionGasLimit(transactionRequest, signer, bufferGasLimitPercentage) {
    if (!signer || !transactionRequest) {
        return undefined;
    }
    try {
        const estimatedGas = transactionRequest.gasLimit
            ? BigNumber.from(transactionRequest.gasLimit)
            : await signer.estimateGas(transactionRequest);
        return estimatedGas === null || estimatedGas === void 0 ? void 0 : estimatedGas.mul(bufferGasLimitPercentage + 100).div(100);
    }
    catch (err) {
        console.error(err);
        return undefined;
    }
}
/**
 * @internal
 */
export async function estimateContractFunctionGasLimit(contractWithSigner, functionName, args, bufferGasLimitPercentage) {
    try {
        const estimatedGas = await contractWithSigner.estimateGas[functionName](...args);
        const gasLimit = estimatedGas === null || estimatedGas === void 0 ? void 0 : estimatedGas.mul(bufferGasLimitPercentage + 100).div(100);
        return gasLimit;
    }
    catch (err) {
        console.error(err);
        return undefined;
    }
}
const isDroppedAndReplaced = (e) => (e === null || e === void 0 ? void 0 : e.code) === errors.TRANSACTION_REPLACED && (e === null || e === void 0 ? void 0 : e.replacement) && ((e === null || e === void 0 ? void 0 : e.reason) === 'repriced' || (e === null || e === void 0 ? void 0 : e.cancelled) === false);
export function usePromiseTransaction(chainId, options) {
    const [state, setState] = useState({ status: 'None' });
    const { addTransaction } = useTransactionsContext();
    const { addNotification } = useNotificationsContext();
    const resetState = useCallback(() => {
        setState({ status: 'None' });
    }, [setState]);
    const promiseTransaction = useCallback(async (transactionPromise) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r;
        if (!chainId)
            return;
        let transaction = undefined;
        try {
            setState({ status: 'PendingSignature', chainId });
            transaction = await transactionPromise;
            setState({ transaction, status: 'Mining', chainId });
            addTransaction({
                transaction: Object.assign(Object.assign({}, transaction), { chainId: chainId }),
                submittedAt: Date.now(),
                transactionName: options === null || options === void 0 ? void 0 : options.transactionName,
            });
            const receipt = await transaction.wait();
            setState({ receipt, transaction, status: 'Success', chainId });
            return receipt;
        }
        catch (e) {
            const parsedErrorCode = parseInt((_g = (_e = (_c = (_b = (_a = e.error) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.code) !== null && _c !== void 0 ? _c : (_d = e.error) === null || _d === void 0 ? void 0 : _d.code) !== null && _e !== void 0 ? _e : (_f = e.data) === null || _f === void 0 ? void 0 : _f.code) !== null && _g !== void 0 ? _g : e.code);
            const errorCode = isNaN(parsedErrorCode) ? undefined : parsedErrorCode;
            const errorMessage = (_q = (_o = (_m = (_k = (_j = (_h = e.error) === null || _h === void 0 ? void 0 : _h.data) === null || _j === void 0 ? void 0 : _j.message) !== null && _k !== void 0 ? _k : (_l = e.error) === null || _l === void 0 ? void 0 : _l.message) !== null && _m !== void 0 ? _m : e.reason) !== null && _o !== void 0 ? _o : (_p = e.data) === null || _p === void 0 ? void 0 : _p.message) !== null && _q !== void 0 ? _q : e.message;
            if (transaction) {
                const droppedAndReplaced = isDroppedAndReplaced(e);
                if (droppedAndReplaced) {
                    const status = e.receipt.status === 0 ? 'Fail' : 'Success';
                    const type = status === 'Fail' ? 'transactionFailed' : 'transactionSucceed';
                    addNotification({
                        notification: {
                            type,
                            submittedAt: Date.now(),
                            transaction: e.replacement,
                            receipt: e.receipt,
                            transactionName: (_r = e.replacement) === null || _r === void 0 ? void 0 : _r.transactionName,
                            originalTransaction: transaction,
                        },
                        chainId,
                    });
                    setState({
                        status,
                        transaction: e.replacement,
                        originalTransaction: transaction,
                        receipt: e.receipt,
                        errorMessage,
                        errorCode,
                        chainId,
                    });
                }
                else {
                    setState({ status: 'Fail', transaction, receipt: e.receipt, errorMessage, errorCode, chainId });
                }
            }
            else {
                setState({ status: 'Exception', errorMessage, errorCode, chainId });
            }
            return undefined;
        }
    }, [chainId, setState, addTransaction, options]);
    return { promiseTransaction, state, resetState };
}
//# sourceMappingURL=usePromiseTransaction.js.map