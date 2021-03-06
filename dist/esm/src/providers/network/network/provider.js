import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useReducer, useState } from 'react';
import { NetworkContext } from './context';
import { defaultNetworkState, networksReducer } from './reducer';
import { providers } from 'ethers';
import { subscribeToProviderEvents, getInjectedProvider } from '../../../helpers';
import { useLocalStorage, useConfig } from '../../../hooks';
import detectEthereumProvider from '@metamask/detect-provider';
const Provider = providers.Provider;
const Web3Provider = providers.Web3Provider;
async function tryToGetAccount(provider) {
    try {
        return await provider.getSigner().getAddress();
    }
    catch (err) {
        if (err.code === 'UNSUPPORTED_OPERATION') {
            // readonly provider
            return undefined;
        }
        throw err;
    }
}
/**
 * @internal Intended for internal use - use it on your own risk
 */
export function NetworkProvider({ children, providerOverride }) {
    const { autoConnect, pollingInterval, noMetamaskDeactivate } = useConfig();
    const [network, dispatch] = useReducer(networksReducer, defaultNetworkState);
    const [onUnsubscribe, setOnUnsubscribe] = useState(() => () => undefined);
    const [shouldConnectMetamask, setShouldConnectMetamask] = useLocalStorage('shouldConnectMetamask');
    const [isLoading, setLoading] = useState(false);
    const activateBrowserWallet = useCallback(async () => {
        setLoading(true);
        const injectedProvider = await getInjectedProvider(pollingInterval);
        if (!injectedProvider) {
            reportError(new Error('No injected provider available'));
            setLoading(false);
            console.error('No injected provider available'); // we do not want to crash the app when there is no metamask
            return;
        }
        try {
            await injectedProvider.send('eth_requestAccounts', []);
            setShouldConnectMetamask(true);
        }
        catch (err) {
            reportError(err);
            setShouldConnectMetamask(false);
            throw err;
        }
        finally {
            setLoading(false);
        }
        return activate(injectedProvider);
    }, []);
    useEffect(() => {
        if (providerOverride) {
            void activate(providerOverride);
        }
    }, [providerOverride]);
    const update = useCallback((newNetwork) => {
        dispatch({ type: 'UPDATE_NETWORK', network: newNetwork });
    }, [network]);
    const reportError = useCallback((error) => {
        console.error(error);
        dispatch({ type: 'ADD_ERROR', error });
    }, []);
    const deactivate = useCallback(() => {
        setShouldConnectMetamask(false);
        update({
            accounts: [],
        });
    }, []);
    const onDisconnect = useCallback((provider) => (error) => {
        const isMetaMask = provider.provider.isMetaMask;
        if (!noMetamaskDeactivate || !isMetaMask) {
            reportError(error);
            deactivate();
        }
    }, []);
    useEffect(() => {
        setTimeout(async () => {
            var _a, _b, _c;
            try {
                if (shouldConnectMetamask && autoConnect && !providerOverride) {
                    await detectEthereumProvider();
                    // If window.ethereum._state.accounts is non null but has no items,
                    // it probably means that the user has disconnected Metamask manually.
                    if (shouldConnectMetamask && ((_c = (_b = (_a = window.ethereum) === null || _a === void 0 ? void 0 : _a._state) === null || _b === void 0 ? void 0 : _b.accounts) === null || _c === void 0 ? void 0 : _c.length) === 0) {
                        return;
                    }
                    await activateBrowserWallet();
                }
            }
            catch (err) {
                console.warn(err);
            }
        });
    }, [shouldConnectMetamask, autoConnect, providerOverride]);
    const activate = useCallback(async (provider) => {
        var _a;
        const wrappedProvider = Provider.isProvider(provider) ? provider : new Web3Provider(provider);
        try {
            setLoading(true);
            const account = await tryToGetAccount(wrappedProvider);
            const chainId = (_a = (await wrappedProvider.getNetwork())) === null || _a === void 0 ? void 0 : _a.chainId;
            onUnsubscribe();
            const clearSubscriptions = subscribeToProviderEvents(wrappedProvider.provider, update, onDisconnect(wrappedProvider));
            setOnUnsubscribe(() => clearSubscriptions);
            update({
                provider: wrappedProvider,
                chainId,
                accounts: account ? [account] : [],
            });
        }
        catch (err) {
            reportError(err);
            throw err;
        }
        finally {
            setLoading(false);
        }
    }, [onUnsubscribe]);
    return (_jsx(NetworkContext.Provider, { value: { network, update, activate, deactivate, reportError, activateBrowserWallet, isLoading }, children: children }));
}
//# sourceMappingURL=provider.js.map