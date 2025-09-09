// 众筹相关类型定义
export interface CrowdfundingProject {
    id: string
    title: string
    description: string // 必须200字
    image: string
    creator: string
    goalAmount: string // USDT
    currentAmount: string // USDT
    startTime: number
    endTime: number
    category: string
    status: 'active' | 'completed' | 'failed' | 'cancelled'
    investors: number
    minContribution: string // USDT
    maxContribution: string // USDT
    milestones: Milestone[]
    tags: string[]
    team: TeamMember[]
}

export interface Milestone {
    id: string
    title: string
    description: string
    targetAmount: string // USDT
    completed: boolean
    completionTime?: number
}

export interface TeamMember {
    id: string
    name: string
    role: string
    avatar: string
    bio: string
    linkedin?: string
    twitter?: string
    github?: string
}

export interface Investment {
    id: string
    projectId: string
    investor: string
    amount: string // USDT
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
