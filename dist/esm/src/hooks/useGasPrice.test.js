import { useGasPrice } from '../../src';
import { expect } from 'chai';
import { renderWeb3Hook, SECOND_TEST_CHAIN_ID } from '../../src/testing';
import { MockProvider } from 'ethereum-waffle';
import { ChainId } from '../constants/chainId';
describe('useGasPrice', () => {
    const mockProvider = new MockProvider();
    const secondMockProvider = new MockProvider({ ganacheOptions: { _chainIdRpc: SECOND_TEST_CHAIN_ID } });
    it('retrieves gas price', async () => {
        var _a;
        const { result, waitForCurrent } = await renderWeb3Hook(useGasPrice);
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.toNumber()).to.be.a('number');
    });
    it('retrieves gas price for multi chain', async () => {
        await testMultiChainUseGasPrice(ChainId.Localhost);
        await testMultiChainUseGasPrice(SECOND_TEST_CHAIN_ID);
    });
    const testMultiChainUseGasPrice = async (chainId) => {
        var _a;
        const { result, waitForCurrent } = await renderWeb3Hook(() => useGasPrice({ chainId }), {
            mockProvider: {
                [ChainId.Localhost]: mockProvider,
                [SECOND_TEST_CHAIN_ID]: secondMockProvider,
            },
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect((_a = result.current) === null || _a === void 0 ? void 0 : _a.toNumber()).to.be.a('number');
    };
});
//# sourceMappingURL=useGasPrice.test.js.map