import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { providers } from 'ethers';
import { useConfig } from '../../../hooks';
import { ReadonlyNetworksContext } from './context';
import { fromEntries } from '../../../helpers/fromEntries';
const { Provider, StaticJsonRpcProvider } = providers;
const getProviderFromConfig = (urlOrProviderOrProviderFunction) => {
    if (Provider.isProvider(urlOrProviderOrProviderFunction)) {
        return urlOrProviderOrProviderFunction;
    }
    if (typeof urlOrProviderOrProviderFunction === 'function') {
        return urlOrProviderOrProviderFunction();
    }
    return new StaticJsonRpcProvider(urlOrProviderOrProviderFunction);
};
export const getProvidersFromConfig = (readOnlyUrls) => fromEntries(Object.entries(readOnlyUrls).map(([chainId, urlOrProviderOrProviderFunction]) => [
    chainId,
    getProviderFromConfig(urlOrProviderOrProviderFunction),
]));
export function ReadonlyNetworksProvider({ providerOverrides = {}, children }) {
    const { readOnlyUrls = {} } = useConfig();
    const [providers, setProviders] = useState(() => (Object.assign(Object.assign({}, getProvidersFromConfig(readOnlyUrls)), providerOverrides)));
    useEffect(() => {
        setProviders(Object.assign(Object.assign({}, getProvidersFromConfig(readOnlyUrls)), providerOverrides));
    }, Object.entries(readOnlyUrls).flat());
    return _jsx(ReadonlyNetworksContext.Provider, Object.assign({ value: providers }, { children: children }));
}
//# sourceMappingURL=provider.js.map