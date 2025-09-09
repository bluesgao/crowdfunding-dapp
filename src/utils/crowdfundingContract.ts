import { parseEther, formatEther } from 'viem'
import type { Address } from 'viem'
import type { CrowdfundingProject, Investment, ProjectStats } from '../types/crowdfunding'

// 模拟的众筹项目数据
export const mockProjects: CrowdfundingProject[] = [
    {
        id: '1',
        title: 'AI 驱动的智能家居系统',
        description: '开发一个基于人工智能的智能家居控制系统，让生活更便捷、更智能。',
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
        creator: '0x1234567890123456789012345678901234567890',
        goalAmount: '50',
        currentAmount: '32.5',
        startTime: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7天前
        endTime: Date.now() + 23 * 24 * 60 * 60 * 1000, // 23天后
        category: '科技',
        status: 'active',
        investors: 156,
        minContribution: '0.1',
        maxContribution: '5',
        milestones: [
            {
                id: '1',
                title: '原型开发',
                description: '完成基础原型和核心功能',
                targetAmount: '20',
                completed: true,
                completionTime: Date.now() - 3 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '测试版本',
                description: '发布测试版本并进行用户测试',
                targetAmount: '35',
                completed: false
            },
            {
                id: '3',
                title: '正式发布',
                description: '完成最终版本并正式发布',
                targetAmount: '50',
                completed: false
            }
        ],
        tags: ['AI', '智能家居', '物联网']
    },
    {
        id: '2',
        title: '环保能源项目',
        description: '开发新型太阳能电池板技术，提高能源转换效率，为环保事业贡献力量。',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=300&fit=crop',
        creator: '0x2345678901234567890123456789012345678901',
        goalAmount: '100',
        currentAmount: '100',
        startTime: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30天前
        endTime: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1天前
        category: '环保',
        status: 'completed',
        investors: 234,
        minContribution: '0.5',
        maxContribution: '10',
        milestones: [
            {
                id: '1',
                title: '技术研发',
                description: '完成核心技术研发',
                targetAmount: '40',
                completed: true,
                completionTime: Date.now() - 20 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '原型制造',
                description: '制造并测试原型产品',
                targetAmount: '70',
                completed: true,
                completionTime: Date.now() - 10 * 24 * 60 * 60 * 1000
            },
            {
                id: '3',
                title: '批量生产',
                description: '开始批量生产',
                targetAmount: '100',
                completed: true,
                completionTime: Date.now() - 1 * 24 * 60 * 60 * 1000
            }
        ],
        tags: ['环保', '太阳能', '新能源']
    },
    {
        id: '3',
        title: '区块链游戏平台',
        description: '构建一个去中心化的游戏平台，让玩家真正拥有游戏资产。',
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop',
        creator: '0x3456789012345678901234567890123456789012',
        goalAmount: '80',
        currentAmount: '45.2',
        startTime: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15天前
        endTime: Date.now() + 15 * 24 * 60 * 60 * 1000, // 15天后
        category: '游戏',
        status: 'active',
        investors: 89,
        minContribution: '0.2',
        maxContribution: '8',
        milestones: [
            {
                id: '1',
                title: '游戏引擎开发',
                description: '开发基础游戏引擎',
                targetAmount: '30',
                completed: true,
                completionTime: Date.now() - 5 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '代币系统',
                description: '实现游戏内代币系统',
                targetAmount: '55',
                completed: false
            },
            {
                id: '3',
                title: '平台发布',
                description: '正式发布游戏平台',
                targetAmount: '80',
                completed: false
            }
        ],
        tags: ['区块链', '游戏', '代币']
    },
    {
        id: '4',
        title: '数字艺术NFT平台',
        description: '创建一个专注于数字艺术家的NFT交易平台，支持原创艺术作品的展示和交易。',
        image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop',
        creator: '0x4567890123456789012345678901234567890123',
        goalAmount: '60',
        currentAmount: '28.7',
        startTime: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10天前
        endTime: Date.now() + 20 * 24 * 60 * 60 * 1000, // 20天后
        category: '艺术',
        status: 'active',
        investors: 67,
        minContribution: '0.1',
        maxContribution: '6',
        milestones: [
            {
                id: '1',
                title: '平台开发',
                description: '完成基础平台开发',
                targetAmount: '25',
                completed: true,
                completionTime: Date.now() - 5 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '艺术家入驻',
                description: '邀请知名艺术家入驻',
                targetAmount: '45',
                completed: false
            },
            {
                id: '3',
                title: '正式上线',
                description: '平台正式上线运营',
                targetAmount: '60',
                completed: false
            }
        ],
        tags: ['NFT', '数字艺术', '区块链']
    },
    {
        id: '5',
        title: '在线教育平台',
        description: '开发一个去中心化的在线教育平台，让知识分享更加公平和透明。',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
        creator: '0x5678901234567890123456789012345678901234',
        goalAmount: '120',
        currentAmount: '85.3',
        startTime: Date.now() - 20 * 24 * 60 * 60 * 1000, // 20天前
        endTime: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10天后
        category: '教育',
        status: 'active',
        investors: 198,
        minContribution: '0.2',
        maxContribution: '12',
        milestones: [
            {
                id: '1',
                title: '课程系统',
                description: '开发课程管理系统',
                targetAmount: '40',
                completed: true,
                completionTime: Date.now() - 15 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '支付系统',
                description: '集成区块链支付系统',
                targetAmount: '80',
                completed: true,
                completionTime: Date.now() - 8 * 24 * 60 * 60 * 1000
            },
            {
                id: '3',
                title: '平台优化',
                description: '优化用户体验和性能',
                targetAmount: '120',
                completed: false
            }
        ],
        tags: ['教育', '区块链', '在线学习']
    },
    {
        id: '6',
        title: '健康监测设备',
        description: '开发智能健康监测设备，实时监测用户健康状态并提供个性化建议。',
        image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
        creator: '0x6789012345678901234567890123456789012345',
        goalAmount: '90',
        currentAmount: '12.4',
        startTime: Date.now() - 3 * 24 * 60 * 60 * 1000, // 3天前
        endTime: Date.now() + 27 * 24 * 60 * 60 * 1000, // 27天后
        category: '健康',
        status: 'active',
        investors: 23,
        minContribution: '0.3',
        maxContribution: '9',
        milestones: [
            {
                id: '1',
                title: '硬件设计',
                description: '完成设备硬件设计',
                targetAmount: '30',
                completed: false
            },
            {
                id: '2',
                title: '软件开发',
                description: '开发配套软件应用',
                targetAmount: '60',
                completed: false
            },
            {
                id: '3',
                title: '产品测试',
                description: '进行产品测试和优化',
                targetAmount: '90',
                completed: false
            }
        ],
        tags: ['健康', '物联网', '智能设备']
    },
    {
        id: '7',
        title: 'DeFi借贷协议',
        description: '构建一个去中心化的借贷协议，为用户提供更公平的金融服务。',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        creator: '0x7890123456789012345678901234567890123456',
        goalAmount: '200',
        currentAmount: '156.8',
        startTime: Date.now() - 25 * 24 * 60 * 60 * 1000, // 25天前
        endTime: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5天后
        category: '金融',
        status: 'active',
        investors: 312,
        minContribution: '1.0',
        maxContribution: '20',
        milestones: [
            {
                id: '1',
                title: '智能合约开发',
                description: '开发核心智能合约',
                targetAmount: '80',
                completed: true,
                completionTime: Date.now() - 20 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '前端界面',
                description: '开发用户界面',
                targetAmount: '140',
                completed: true,
                completionTime: Date.now() - 10 * 24 * 60 * 60 * 1000
            },
            {
                id: '3',
                title: '安全审计',
                description: '进行安全审计和测试',
                targetAmount: '200',
                completed: false
            }
        ],
        tags: ['DeFi', '借贷', '智能合约']
    },
    {
        id: '8',
        title: '虚拟现实社交平台',
        description: '创建一个沉浸式的VR社交平台，让用户在虚拟世界中自由交流和互动。',
        image: 'https://images.unsplash.com/photo-1592478411213-6153e4c4a8b4?w=400&h=300&fit=crop',
        creator: '0x8901234567890123456789012345678901234567',
        goalAmount: '150',
        currentAmount: '45.6',
        startTime: Date.now() - 12 * 24 * 60 * 60 * 1000, // 12天前
        endTime: Date.now() + 18 * 24 * 60 * 60 * 1000, // 18天后
        category: '游戏',
        status: 'active',
        investors: 78,
        minContribution: '0.5',
        maxContribution: '15',
        milestones: [
            {
                id: '1',
                title: 'VR引擎开发',
                description: '开发VR渲染引擎',
                targetAmount: '50',
                completed: true,
                completionTime: Date.now() - 8 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '社交功能',
                description: '实现社交互动功能',
                targetAmount: '100',
                completed: false
            },
            {
                id: '3',
                title: '平台发布',
                description: '正式发布VR社交平台',
                targetAmount: '150',
                completed: false
            }
        ],
        tags: ['VR', '社交', '虚拟现实']
    },
    {
        id: '9',
        title: '智能农业系统',
        description: '开发基于物联网的智能农业系统，提高农作物产量和农业效率。',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop',
        creator: '0x9012345678901234567890123456789012345678',
        goalAmount: '75',
        currentAmount: '75',
        startTime: Date.now() - 35 * 24 * 60 * 60 * 1000, // 35天前
        endTime: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5天前
        category: '环保',
        status: 'completed',
        investors: 145,
        minContribution: '0.2',
        maxContribution: '7.5',
        milestones: [
            {
                id: '1',
                title: '传感器网络',
                description: '部署农业传感器网络',
                targetAmount: '25',
                completed: true,
                completionTime: Date.now() - 25 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '数据分析系统',
                description: '开发数据分析系统',
                targetAmount: '50',
                completed: true,
                completionTime: Date.now() - 15 * 24 * 60 * 60 * 1000
            },
            {
                id: '3',
                title: '系统集成',
                description: '完成系统集成和测试',
                targetAmount: '75',
                completed: true,
                completionTime: Date.now() - 5 * 24 * 60 * 60 * 1000
            }
        ],
        tags: ['农业', '物联网', '智能系统']
    },
    {
        id: '10',
        title: '音乐版权平台',
        description: '构建一个基于区块链的音乐版权保护平台，让音乐创作者获得公平的收益。',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
        creator: '0x0123456789012345678901234567890123456789',
        goalAmount: '110',
        currentAmount: '67.2',
        startTime: Date.now() - 18 * 24 * 60 * 60 * 1000, // 18天前
        endTime: Date.now() + 12 * 24 * 60 * 60 * 1000, // 12天后
        category: '艺术',
        status: 'active',
        investors: 134,
        minContribution: '0.1',
        maxContribution: '11',
        milestones: [
            {
                id: '1',
                title: '版权系统',
                description: '开发版权保护系统',
                targetAmount: '40',
                completed: true,
                completionTime: Date.now() - 12 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '支付机制',
                description: '实现自动支付机制',
                targetAmount: '75',
                completed: false
            },
            {
                id: '3',
                title: '平台上线',
                description: '正式上线音乐平台',
                targetAmount: '110',
                completed: false
            }
        ],
        tags: ['音乐', '版权', '区块链']
    }
]

// 模拟的投资数据
export const mockInvestments: Investment[] = [
    {
        id: '1',
        projectId: '1',
        investor: '0x1111111111111111111111111111111111111111',
        amount: '2.5',
        timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000,
        refunded: false
    },
    {
        id: '2',
        projectId: '1',
        investor: '0x2222222222222222222222222222222222222222',
        amount: '1.0',
        timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000,
        refunded: false
    }
]

// 众筹合约模拟函数
export const crowdfundingContract = {
    // 获取所有众筹项目
    async getAllProjects(): Promise<CrowdfundingProject[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(mockProjects)
            }, 500)
        })
    },

    // 获取项目详情
    async getProject(projectId: string): Promise<CrowdfundingProject | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const project = mockProjects.find(p => p.id === projectId)
                resolve(project || null)
            }, 300)
        })
    },


    // 投资众筹项目
    async investInProject(projectId: string, amount: string, investor: Address): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const project = mockProjects.find(p => p.id === projectId)
                if (project && project.status === 'active') {
                    const currentAmount = parseFloat(project.currentAmount)
                    const newAmount = currentAmount + parseFloat(amount)
                    project.currentAmount = newAmount.toString()
                    project.investors += 1

                    // 检查是否达到目标
                    if (newAmount >= parseFloat(project.goalAmount)) {
                        project.status = 'completed'
                    }

                    // 添加投资记录
                    const investment: Investment = {
                        id: (mockInvestments.length + 1).toString(),
                        projectId,
                        investor,
                        amount,
                        timestamp: Date.now(),
                        refunded: false
                    }
                    mockInvestments.push(investment)

                    resolve(true)
                } else {
                    resolve(false)
                }
            }, 1500)
        })
    },

    // 获取用户投资的项目
    async getUserInvestments(userAddress: Address): Promise<Investment[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userInvestments = mockInvestments.filter(inv => inv.investor === userAddress)
                resolve(userInvestments)
            }, 500)
        })
    },

    // 获取用户创建的项目
    async getUserProjects(userAddress: Address): Promise<CrowdfundingProject[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const userProjects = mockProjects.filter(p => p.creator === userAddress)
                resolve(userProjects)
            }, 500)
        })
    },

    // 申请退款
    async requestRefund(projectId: string, investor: Address): Promise<boolean> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const investment = mockInvestments.find(
                    inv => inv.projectId === projectId && inv.investor === investor && !inv.refunded
                )
                if (investment) {
                    investment.refunded = true
                    resolve(true)
                } else {
                    resolve(false)
                }
            }, 1000)
        })
    },

    // 获取统计数据
    async getStats(): Promise<ProjectStats> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const totalRaised = mockProjects.reduce((sum, p) => sum + parseFloat(p.currentAmount), 0)
                const totalGoal = mockProjects.reduce((sum, p) => sum + parseFloat(p.goalAmount), 0)
                const successRate = mockProjects.length > 0 ? (mockProjects.filter(p => p.status === 'completed').length / mockProjects.length * 100) : 0

                const stats: ProjectStats = {
                    totalProjects: mockProjects.length,
                    activeProjects: mockProjects.filter(p => p.status === 'active').length,
                    completedProjects: mockProjects.filter(p => p.status === 'completed').length,
                    totalRaised: totalRaised.toFixed(2),
                    totalInvestors: mockInvestments.filter(inv => !inv.refunded).length,
                    totalGoal: totalGoal.toFixed(2),
                    successRate: successRate.toFixed(1),
                    averageInvestment: mockInvestments.length > 0 ? (totalRaised / mockInvestments.length).toFixed(3) : '0'
                }
                resolve(stats)
            }, 300)
        })
    }
}

// 工具函数
export const formatAmount = (amount: string) => {
    return `${formatEther(parseEther(amount))} ETH`
}

export const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('zh-CN')
}

export const getTimeRemaining = (endTime: number) => {
    const now = Date.now()
    const remaining = endTime - now

    if (remaining <= 0) {
        return '已结束'
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24))
    const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

    return `${days}天 ${hours}小时`
}

export const getProgressPercentage = (current: string, goal: string) => {
    const currentAmount = parseFloat(current)
    const goalAmount = parseFloat(goal)
    return Math.min((currentAmount / goalAmount) * 100, 100)
}
