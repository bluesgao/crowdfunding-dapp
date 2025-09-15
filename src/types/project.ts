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
    projectMilestone?: ProjectMilestone[]
    tags?: string[]
    projectTeam?: ProjectTeamMember[]
}

export interface ProjectMilestone {
    id: number
    projectId: number
    title: string
    description: string
    targetDate: string // ISO 8601 格式
    completedDate: string // ISO 8601 格式
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
    progress: number // 0-100
    priority: 'low' | 'medium' | 'high'
}

export interface ProjectTeamMember {
    id: number
    projectId: number
    memberName: string
    memberRole: string
    address: string
    email: string
    bio: string
    avatarUrl: string
    isActive: boolean
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
}
