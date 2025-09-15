import type { ProjectType } from '../constants/projectTypes'

// 众筹相关类型定义 - 匹配后端 ProjectResponse 结构体
export interface Project {
    id: number
    title: string
    description: string
    imageUrl: string
    category: ProjectType
    creator: string
    targetAmount: number
    currentAmount: number
    minAmount: number
    maxAmount: number
    status: 'pending' | 'deploying' | 'active' | 'success' | 'failed' | 'cancelled'
    startTime: string // ISO 8601 格式
    endTime: string // ISO 8601 格式
    createdAt: string // ISO 8601 格式
    updatedAt: string // ISO 8601 格式
    // 可选字段（前端可能需要但后端暂时没有的）
    investors?: number
    milestones?: Milestone[]
    tags?: string[]
    team?: TeamMember[]
}

export interface Milestone {
    id: string
    title: string
    description: string
    targetAmount: string // ETH
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
    amount: string // ETH
    timestamp: number
    refunded: boolean
}


export interface ProjectStats {
    totalProjects: number
    pendingProjects: number
    deployingProjects: number
    activeProjects: number
    successProjects: number
    failedProjects: number
    cancelledProjects: number
    totalRaised: string
    totalInvestors: number
    totalGoal: string
    successRate: string
    averageInvestment: string
}
