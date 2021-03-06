/// <reference types="react" />
import { Network } from './model';
import type { providers } from 'ethers';
declare type JsonRpcProvider = providers.JsonRpcProvider;
declare type ExternalProvider = providers.ExternalProvider;
export declare const NetworkContext: import("react").Context<{
    update: (network: Partial<Network>) => void;
    reportError: (error: Error) => void;
    activate: (provider: JsonRpcProvider | ExternalProvider) => Promise<void>;
    deactivate: () => void;
    network: Network;
    activateBrowserWallet: () => void;
    isLoading: boolean;
}>;
/**
 * @internal
 */
export declare function useNetwork(): {
    update: (network: Partial<Network>) => void;
    reportError: (error: Error) => void;
    activate: (provider: providers.JsonRpcProvider | providers.ExternalProvider) => Promise<void>;
    deactivate: () => void;
    network: Network;
    activateBrowserWallet: () => void;
    isLoading: boolean;
};
export {};
//# sourceMappingURL=context.d.ts.map