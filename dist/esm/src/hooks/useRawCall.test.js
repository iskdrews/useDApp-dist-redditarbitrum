import { MockProvider } from '@ethereum-waffle/provider';
import { expect } from 'chai';
import { utils } from 'ethers';
import { ChainId } from '../constants/chainId';
import { encodeCallData } from '../helpers';
import { deployMockToken, MOCK_TOKEN_INITIAL_BALANCE, renderWeb3Hook, SECOND_MOCK_TOKEN_INITIAL_BALANCE, SECOND_TEST_CHAIN_ID, } from '../testing';
import { useRawCall, useRawCalls } from './useRawCalls';
describe('useRawCall', () => {
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
    it('can query ERC20 balance', async () => {
        const call = {
            address: token.address,
            data: token.interface.encodeFunctionData('balanceOf', [deployer.address]),
            chainId: mockProvider.network.chainId,
        };
        const { result, waitForCurrent } = await renderWeb3Hook(() => useRawCall(call), {
            mockProvider,
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current.success).to.eq(true);
        expect(result.current.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('Works for a different combinations of address casing', async () => {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const calls = [
            {
                address: token.address.toLowerCase(),
                data: token.interface.encodeFunctionData('balanceOf', [deployer.address.toLowerCase()]),
                chainId: mockProvider.network.chainId,
            },
            {
                address: token.address.toLowerCase(),
                data: token.interface.encodeFunctionData('balanceOf', [utils.getAddress(deployer.address)]),
                chainId: mockProvider.network.chainId,
            },
            {
                address: utils.getAddress(token.address),
                data: token.interface.encodeFunctionData('balanceOf', [deployer.address.toLowerCase()]),
                chainId: mockProvider.network.chainId,
            },
            {
                address: utils.getAddress(token.address),
                data: token.interface.encodeFunctionData('balanceOf', [utils.getAddress(deployer.address)]),
                chainId: mockProvider.network.chainId,
            },
        ];
        const { result, waitForCurrent } = await renderWeb3Hook(() => useRawCalls(calls), {
            mockProvider,
        });
        await waitForCurrent((val) => val !== undefined && val.every((x) => x === null || x === void 0 ? void 0 : x.success));
        expect(result.error).to.be.undefined;
        expect(result.current.length).to.eq(4);
        expect((_a = result.current[0]) === null || _a === void 0 ? void 0 : _a.success).to.be.true;
        expect((_b = result.current[0]) === null || _b === void 0 ? void 0 : _b.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
        expect((_c = result.current[1]) === null || _c === void 0 ? void 0 : _c.success).to.be.true;
        expect((_d = result.current[1]) === null || _d === void 0 ? void 0 : _d.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
        expect((_e = result.current[2]) === null || _e === void 0 ? void 0 : _e.success).to.be.true;
        expect((_f = result.current[2]) === null || _f === void 0 ? void 0 : _f.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
        expect((_g = result.current[3]) === null || _g === void 0 ? void 0 : _g.success).to.be.true;
        expect((_h = result.current[3]) === null || _h === void 0 ? void 0 : _h.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('returns correct initial balance for mainnet', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(() => useRawCall(encodeCallData({
            contract: token,
            args: [deployer.address],
            method: 'balanceOf',
        }, ChainId.Localhost)), {
            mockProvider: {
                [ChainId.Localhost]: mockProvider,
                [SECOND_TEST_CHAIN_ID]: secondMockProvider,
            },
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current.success).to.eq(true);
        expect(result.current.value).to.eq(MOCK_TOKEN_INITIAL_BALANCE);
    });
    it('returns correct initial balance for other chain', async () => {
        const { result, waitForCurrent } = await renderWeb3Hook(() => useRawCall(encodeCallData({
            contract: secondToken,
            args: [secondDeployer.address],
            method: 'balanceOf',
        }, SECOND_TEST_CHAIN_ID)), {
            mockProvider: {
                [ChainId.Localhost]: mockProvider,
                [SECOND_TEST_CHAIN_ID]: secondMockProvider,
            },
        });
        await waitForCurrent((val) => val !== undefined);
        expect(result.error).to.be.undefined;
        expect(result.current.success).to.eq(true);
        expect(result.current.value).to.eq(SECOND_MOCK_TOKEN_INITIAL_BALANCE);
    });
});
//# sourceMappingURL=useRawCall.test.js.map