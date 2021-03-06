import { MockProvider } from '@ethereum-waffle/provider';
import { expect } from 'chai';
import { renderWeb3Hook, deployMockToken, MOCK_TOKEN_INITIAL_BALANCE, SECOND_TEST_CHAIN_ID, SECOND_MOCK_TOKEN_INITIAL_BALANCE, } from '../testing';
import { ChainId } from '../constants/chainId';
import { ERC20Interface } from '../constants/abi';
import { useContractCall } from './useContractCall';
describe('useContractCall', () => {
    const mockProvider = new MockProvider();
    const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } });
    const [deployer] = mockProvider.getWallets();
    const [secondDeployer] = secondMockProvider.getWallets();
    let token;
    let secondToken;
    beforeEach(async () => {
        token = await deployMockToken(deployer);
        secondToken = await deployMockToken(secondDeployer, SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('initial test balance to be correct', async () => {
        var _a, _b;
        const callData = {
            abi: ERC20Interface,
            address: token.address,
            method: 'balanceOf',
            args: [deployer.address],
        };
        const { result, waitForCurrent } = await renderWeb3Hook(() => useContractCall(callData, { chainId: ChainId.Localhost }), {
            mockProvider,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a[0]).not.to.be.undefined;
        expect((_b = result.current) === null || _b === void 0 ? void 0 : _b[0]).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('multichain calls return correct initial balances', async () => {
        await testMultiChainUseContractCall(token.address, [deployer.address], ChainId.Localhost, MOCK_TOKEN_INITIAL_BALANCE);
        await testMultiChainUseContractCall(secondToken.address, [secondDeployer.address], SECOND_TEST_CHAIN_ID, SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    const testMultiChainUseContractCall = async (address, args, chainId, endValue) => {
        var _a, _b;
        const { result, waitForCurrent } = await renderWeb3Hook(() => useContractCall({
            abi: ERC20Interface,
            address,
            method: 'balanceOf',
            args,
        }, { chainId }), {
            mockProvider: {
                [ChainId.Localhost]: mockProvider,
                [SECOND_TEST_CHAIN_ID]: secondMockProvider,
            },
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a[0]).not.to.be.undefined;
        expect((_b = result.current) === null || _b === void 0 ? void 0 : _b[0]).to.eq(endValue);
    };
    it('is prepared for a case of undefined address', async () => {
        const callData = {
            abi: ERC20Interface,
            address: undefined,
            method: 'balanceOf',
            args: [deployer.address],
        };
        const { result, waitForNextUpdate } = await renderWeb3Hook(() => useContractCall(callData, { chainId: ChainId.Localhost }), {
            mockProvider,
        });
        await waitForNextUpdate();
        expect(result.error).to.be.undefined;
        expect(result.current).to.be.undefined;
    });
});
//# sourceMappingURL=useContractCall.test.js.map