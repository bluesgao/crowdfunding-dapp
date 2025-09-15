const express = require('express')
const cors = require('cors')
const app = express()
const port = 18889

// 启用 CORS
app.use(cors())
app.use(express.json())

// 模拟项目数据
const mockProjects = [
    {
        id: '1',
        title: '去中心化音乐平台',
        description: '一个基于区块链的音乐分享和版权管理平台，让音乐创作者能够直接与粉丝互动，获得公平的收益分配。我们致力于打破传统音乐产业的垄断，为独立音乐人提供更多机会。',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500',
        creator: '0x1234...5678',
        goalAmount: '50.0',
        currentAmount: '25.5',
        startTime: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7天前
        endTime: Date.now() + 23 * 24 * 60 * 60 * 1000, // 23天后
        category: '音乐',
        status: 'active',
        investors: 45,
        minContribution: '0.01',
        maxContribution: '5.0',
        milestones: [
            {
                id: '1',
                title: 'MVP 开发',
                description: '完成基础功能开发',
                targetAmount: '20.0',
                completed: true,
                completionTime: Date.now() - 3 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: 'Beta 测试',
                description: '进行用户测试和反馈收集',
                targetAmount: '35.0',
                completed: false
            }
        ],
        tags: ['音乐', '区块链', '版权'],
        team: [
            {
                id: '1',
                name: '张三',
                role: '创始人',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
                socialLinks: {
                    twitter: 'https://twitter.com/zhangsan'
                }
            }
        ]
    },
    {
        id: '2',
        title: '绿色能源项目',
        description: '利用太阳能和风能技术，为偏远地区提供清洁能源解决方案。我们的目标是让每个人都能享受到可持续的能源，同时保护我们的地球环境。',
        image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=500',
        creator: '0x2345...6789',
        goalAmount: '100.0',
        currentAmount: '75.2',
        startTime: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14天前
        endTime: Date.now() + 16 * 24 * 60 * 60 * 1000, // 16天后
        category: '环保',
        status: 'active',
        investors: 89,
        minContribution: '0.05',
        maxContribution: '10.0',
        milestones: [
            {
                id: '1',
                title: '技术研发',
                description: '完成核心技术研发',
                targetAmount: '40.0',
                completed: true,
                completionTime: Date.now() - 10 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '试点部署',
                description: '在试点地区部署设备',
                targetAmount: '70.0',
                completed: false
            }
        ],
        tags: ['环保', '能源', '可持续发展'],
        team: [
            {
                id: '1',
                name: '李四',
                role: '技术总监',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
                socialLinks: {
                    linkedin: 'https://linkedin.com/in/lisi'
                }
            }
        ]
    }
]

// 获取所有项目
app.get('/api/v1/project', (req, res) => {
    console.log('GET /api/v1/project')
    res.json(mockProjects)
})

// 获取单个项目
app.get('/api/v1/project/:id', (req, res) => {
    const { id } = req.params
    console.log(`GET /api/v1/project/${id}`)

    const project = mockProjects.find(p => p.id === id)
    if (!project) {
        return res.status(404).json({ error: 'Project not found' })
    }

    res.json(project)
})

// 获取项目统计
app.get('/api/v1/project/stats', (req, res) => {
    console.log('GET /api/v1/project/stats')

    const totalProjects = mockProjects.length
    const activeProjects = mockProjects.filter(p => p.status === 'active').length
    const completedProjects = mockProjects.filter(p => p.status === 'completed').length

    const totalRaised = mockProjects.reduce((sum, p) => sum + parseFloat(p.currentAmount), 0).toFixed(2)
    const totalGoal = mockProjects.reduce((sum, p) => sum + parseFloat(p.goalAmount), 0).toFixed(2)
    const totalInvestors = mockProjects.reduce((sum, p) => sum + p.investors, 0)

    const successRate = totalProjects > 0 ? ((completedProjects / totalProjects) * 100).toFixed(1) : '0.0'
    const averageInvestment = totalInvestors > 0 ? (parseFloat(totalRaised) / totalInvestors).toFixed(3) : '0.000'

    res.json({
        totalProjects,
        activeProjects,
        completedProjects,
        totalRaised,
        totalInvestors,
        totalGoal,
        successRate,
        averageInvestment
    })
})

// 健康检查
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

app.listen(port, () => {
    console.log(`🚀 Mock API server running at http://localhost:${port}`)
    console.log(`📊 Available endpoints:`)
    console.log(`   GET /api/v1/project - 获取所有项目`)
    console.log(`   GET /api/v1/project/:id - 获取单个项目`)
    console.log(`   GET /api/v1/project/stats - 获取项目统计`)
    console.log(`   GET /health - 健康检查`)
})
