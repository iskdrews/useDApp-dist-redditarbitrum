import { MockProvider } from '@ethereum-waffle/provider';
import { expect } from 'chai';
import { renderWeb3Hook, deployMockToken, MOCK_TOKEN_INITIAL_BALANCE, SECOND_TEST_CHAIN_ID, SECOND_MOCK_TOKEN_INITIAL_BALANCE, } from '../testing';
import { encodeCallData } from '../helpers';
import { ChainId } from '../constants/chainId';
import { useChainCall } from './useChainCalls';
describe('useChainCall', () => {
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
        const callData = {
            contract: token,
            method: 'balanceOf',
            args: [deployer.address],
        };
        const { result, waitForCurrent } = await renderWeb3Hook(() => useChainCall(encodeCallData(callData, ChainId.Localhost)), {
            mockProvider,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('multichain calls return correct initial balances', async () => {
        await testMultiChainUseChainCall(token, [deployer.address], ChainId.Localhost, MOCK_TOKEN_INITIAL_BALANCE);
        await testMultiChainUseChainCall(secondToken, [secondDeployer.address], SECOND_TEST_CHAIN_ID, SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
    const testMultiChainUseChainCall = async (contract, args, chainId, endValue) => {
        const { result, waitForCurrent } = await renderWeb3Hook(() => useChainCall(encodeCallData({
            contract,
            method: 'balanceOf',
            args,
        }, chainId)), {
            mockProvider: {
                [ChainId.Localhost]: mockProvider,
                [SECOND_TEST_CHAIN_ID]: secondMockProvider,
            },
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current).to.eq(endValue);
    };
});
//# sourceMappingURL=useChainCall.test.js.map