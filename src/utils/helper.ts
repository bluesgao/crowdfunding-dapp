import { parseEther, formatEther } from 'viem'

// 工具函数
export const formatAmount = (amount: string) => {
    return `${formatEther(parseEther(amount))} ETH`
}


export const getProgressPercentage = (current: string, goal: string) => {
    const currentAmount = parseFloat(current)
    const goalAmount = parseFloat(goal)

    if (goalAmount === 0) {
        return 0
    }

    return Math.min((currentAmount / goalAmount) * 100, 100)
}