import { parseEther, formatEther } from 'viem'

// 工具函数
export const formatAmount = (amount: string) => {
    return `${formatEther(parseEther(amount))} ETH`
}

export const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN')
}

export const getTimeRemaining = (endTime: number) => {
    const now = Date.now()
    const timeLeft = endTime - now

    if (timeLeft <= 0) {
        return 0
    }

    return Math.ceil(timeLeft / (1000 * 60 * 60 * 24))
}

export const getProgressPercentage = (current: string, goal: string) => {
    const currentAmount = parseFloat(current)
    const goalAmount = parseFloat(goal)

    if (goalAmount === 0) {
        return 0
    }

    return Math.min((currentAmount / goalAmount) * 100, 100)
}