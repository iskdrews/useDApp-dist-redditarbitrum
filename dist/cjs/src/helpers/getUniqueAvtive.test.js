"use strict";
exports.__esModule = true;
var ethers_1 = require("ethers");
var chai_1 = require("chai");
var calls_1 = require("./calls");
describe('getUniqueActiveChainCalls', function () {
    it('returns a list of unique chain calls', function () {
        var addresses = [ethers_1.Wallet.createRandom().address, ethers_1.Wallet.createRandom().address];
        var calls = [
            {
                chainId: 1,
                address: addresses[0],
                data: '0x123'
            },
            {
                chainId: 1,
                address: addresses[0].toLowerCase(),
                data: '0x123'
            },
            {
                chainId: 2,
                address: addresses[0].toLowerCase(),
                data: '0x123'
            },
            {
                chainId: 1,
                address: addresses[0],
                data: '0xc0ffee'
            },
            {
                chainId: 2,
                address: addresses[1],
                data: '0x123'
            },
        ];
        (0, chai_1.expect)((0, calls_1.getUniqueActiveCalls)(calls)).to.deep.equal([
            {
                chainId: 1,
                address: addresses[0],
                data: '0x123'
            },
            {
                chainId: 2,
                address: addresses[0].toLowerCase(),
                data: '0x123'
            },
            {
                chainId: 1,
                address: addresses[0],
                data: '0xc0ffee'
            },
            {
                chainId: 2,
                address: addresses[1],
                data: '0x123'
            },
        ]);
    });
    it('returns a list of unique and not disabled chain calls', function () {
        var addresses = [ethers_1.Wallet.createRandom().address, ethers_1.Wallet.createRandom().address];
        var calls = [
            {
                chainId: 1,
                address: addresses[0],
                data: '0x123',
                isDisabled: true
            },
            {
                chainId: 1,
                address: addresses[0],
                data: '0x123'
            },
            {
                chainId: 1,
                address: addresses[0],
                data: '0xc0ffee',
                isDisabled: true
            },
        ];
        (0, chai_1.expect)((0, calls_1.getUniqueActiveCalls)(calls)).to.deep.equal([
            {
                chainId: 1,
                address: addresses[0],
                data: '0x123'
            },
        ]);
    });
});
//# sourceMappingURL=getUniqueAvtive.test.js.map