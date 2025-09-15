// counterContract.ts
import type { Address } from 'viem'

// Counter 合约 ABI
export const COUNTER_ABI = [
    {
        "type": "function",
        "name": "increment",
        "inputs": [],
        "outputs": [],
        "stateMutability": "nonpayable"
    },
    {
        "type": "function",
        "name": "number",
        "inputs": [],
        "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
        "stateMutability": "view"
    },
    {
        "type": "event",
        "name": "Increment",
        "inputs": [
            {
                "name": "sender",
                "type": "address",
                "indexed": true,
                "internalType": "address"
            },
            {
                "name": "oldNumber",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "newNumber",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            },
            {
                "name": "increment",
                "type": "uint256",
                "indexed": false,
                "internalType": "uint256"
            }
        ],
        "anonymous": false
    }
] as const

// 合约地址
export const COUNTER_CONTRACT_ADDRESS = '0xc90698955C1cBD5d411F75c4adae0ba2D1Db6ef5' as Address

// 合约配置
export const counterContractConfig = {
    address: COUNTER_CONTRACT_ADDRESS,
    abi: COUNTER_ABI,
} as const
