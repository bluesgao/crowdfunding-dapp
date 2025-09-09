// 众筹相关类型定义
export interface CrowdfundingProject {
    id: string
    title: string
    description: string
    image: string
    creator: string
    goalAmount: string // ETH
    currentAmount: string // ETH
    startTime: number
    endTime: number
    category: string
    status: 'active' | 'completed' | 'failed' | 'cancelled'
    investors: number
    minContribution: string // ETH
    maxContribution: string // ETH
    milestones: Milestone[]
    tags: string[]
}

export interface Milestone {
    id: string
    title: string
    description: string
    targetAmount: string // ETH
    completed: boolean
    completionTime?: number
}

export interface Investment {
    id: string
    projectId: string
    investor: string
    amount: string // ETH
    timestamp: number
    refunded: boolean
}


export interface ProjectStats {
    totalProjects: number
    activeProjects: number
    completedProjects: number
    totalRaised: string
    totalInvestors: number
    totalGoal: string
    successRate: string
    averageInvestment: string
}
