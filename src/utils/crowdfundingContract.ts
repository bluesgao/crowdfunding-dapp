import { parseEther, formatEther } from 'viem'
import type { Address } from 'viem'
import type { CrowdfundingProject, Investment, ProjectStats } from '../types/crowdfunding'

// 模拟的众筹项目数据
export const mockProjects: CrowdfundingProject[] = [
    {
        id: '1',
        title: 'AI 驱动的智能家居系统',
        description: '开发一个基于人工智能的智能家居控制系统，让生活更便捷、更智能。本项目采用先进的机器学习算法，能够学习用户的生活习惯，自动调节室内温度、照明、安防等系统。通过语音识别和自然语言处理技术，用户可以通过简单的语音指令控制家中的各种设备。系统还具备智能节能功能，能够根据环境变化和用户需求自动优化能耗，为用户节省电费开支。同时，我们注重数据安全和隐私保护，所有用户数据都经过加密处理，确保用户信息不被泄露。项目团队由来自知名科技公司的资深工程师组成，拥有丰富的AI和物联网开发经验。',
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
        tags: ['AI', '智能家居', '物联网'],
        team: [
            {
                id: '1',
                name: '张明',
                role: '项目负责人',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                bio: '10年AI领域经验，曾在Google和百度担任高级工程师',
                linkedin: 'https://linkedin.com/in/zhangming',
                github: 'https://github.com/zhangming'
            },
            {
                id: '2',
                name: '李华',
                role: '技术总监',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                bio: '物联网专家，拥有15年硬件开发经验',
                linkedin: 'https://linkedin.com/in/lihua',
                twitter: 'https://twitter.com/lihua'
            },
            {
                id: '3',
                name: '王芳',
                role: '产品经理',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                bio: '用户体验专家，专注于智能家居产品设计',
                linkedin: 'https://linkedin.com/in/wangfang'
            }
        ]
    },
    {
        id: '2',
        title: '环保能源项目',
        description: '开发新型太阳能电池板技术，提高能源转换效率，为环保事业贡献力量。我们采用最新的钙钛矿太阳能电池技术，相比传统硅基电池板，转换效率提升30%以上，成本降低40%。项目团队与多所知名大学合作，拥有20多项相关专利技术。产品具有轻量化、柔性化特点，可应用于建筑一体化、移动设备充电等多个场景。我们致力于推动清洁能源的普及，减少化石燃料的使用，为全球气候变化问题提供解决方案。项目已获得多家投资机构的认可，预计投产后年产能达到100万片，年产值超过10亿元。',
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
        tags: ['环保', '太阳能', '新能源'],
        team: [
            {
                id: '1',
                name: '陈强',
                role: 'CEO',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
                bio: '新能源领域专家，拥有20年行业经验',
                linkedin: 'https://linkedin.com/in/chenqiang'
            },
            {
                id: '2',
                name: '刘敏',
                role: 'CTO',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                bio: '材料科学博士，专注于太阳能技术研发',
                linkedin: 'https://linkedin.com/in/liumin',
                github: 'https://github.com/liumin'
            }
        ]
    },
    {
        id: '3',
        title: '区块链游戏平台',
        description: '构建一个去中心化的游戏平台，让玩家真正拥有游戏资产。我们基于区块链技术开发，确保游戏道具、角色、土地等虚拟资产的所有权归玩家所有，支持跨游戏交易和流通。平台采用NFT技术，每个游戏资产都是独一无二的数字藏品，具有收藏和投资价值。我们与多家知名游戏开发商合作，已签约20多款精品游戏，涵盖RPG、策略、卡牌等多种类型。玩家可以通过游戏获得代币奖励，参与平台治理投票，分享平台发展红利。项目团队由区块链和游戏行业资深专家组成，拥有丰富的技术积累和行业资源。',
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
        tags: ['区块链', '游戏', '代币'],
        team: [
            {
                id: '1',
                name: '赵磊',
                role: '创始人',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
                bio: '区块链技术专家，游戏行业资深从业者',
                linkedin: 'https://linkedin.com/in/zhaolei'
            },
            {
                id: '2',
                name: '孙丽',
                role: '技术总监',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
                bio: '游戏开发专家，拥有10年Unity和区块链开发经验',
                linkedin: 'https://linkedin.com/in/sunli',
                github: 'https://github.com/sunli'
            }
        ]
    },
    {
        id: '4',
        title: '数字艺术NFT平台',
        description: '创建一个专注于数字艺术家的NFT交易平台，支持原创艺术作品的展示和交易。我们致力于为数字艺术家提供一个公平、透明的创作和交易环境，让艺术家的作品能够获得应有的价值认可。平台采用先进的区块链技术，确保每件艺术品的版权归属和交易记录不可篡改。我们与全球知名艺术院校和画廊合作，为艺术家提供专业的创作指导和市场推广支持。平台还集成了AI技术，能够自动识别和推荐优质艺术作品，帮助收藏家发现潜力作品。我们相信艺术无国界，通过技术的力量让更多人能够欣赏和收藏数字艺术作品，推动数字艺术行业的健康发展。',
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
        tags: ['NFT', '数字艺术', '区块链'],
        team: [
            {
                id: '1',
                name: '李娜',
                role: '项目负责人',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
                bio: '数字艺术领域专家，拥有丰富的NFT项目经验',
                linkedin: 'https://linkedin.com/in/lina'
            },
            {
                id: '2',
                name: '王强',
                role: '技术总监',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                bio: '区块链技术专家，专注于智能合约和NFT标准开发',
                linkedin: 'https://linkedin.com/in/wangqiang',
                github: 'https://github.com/wangqiang'
            }
        ]
    },
    {
        id: '5',
        title: '在线教育平台',
        description: '开发一个去中心化的在线教育平台，让知识分享更加公平和透明。我们致力于打破传统教育的壁垒，让优质教育资源能够惠及全球每一个角落。平台采用区块链技术确保课程内容的版权保护，同时通过智能合约实现自动化的收益分配，让知识创作者获得公平的回报。我们汇聚了来自世界顶级大学和知名企业的专家讲师，提供涵盖编程、设计、商业、语言等多个领域的精品课程。平台还集成了AI个性化学习系统，能够根据学员的学习进度和兴趣偏好，智能推荐最适合的学习路径。我们相信教育改变命运，通过技术的力量让学习变得更加高效、有趣和个性化，为每个人提供终身学习的机会。',
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
        tags: ['教育', '区块链', '在线学习'],
        team: [
            {
                id: "1",
                name: "周杰",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "教育科技专家，拥有15年在线教育行业经验",
                linkedin: "https://linkedin.com/in/zhoujie"
            },
            {
                id: "2",
                name: "吴敏",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                bio: "区块链技术专家，专注于教育领域应用开发",
                linkedin: "https://linkedin.com/in/wumin",
                github: "https://github.com/wumin"
            }
        ]
    },
    {
        id: '6',
        title: '健康监测设备',
        description: '开发智能健康监测设备，实时监测用户健康状态并提供个性化建议。我们致力于通过先进的传感器技术和人工智能算法，为用户提供全方位的健康管理解决方案。设备能够24小时连续监测心率、血压、血氧、体温等关键生理指标，并通过机器学习分析用户的健康趋势，提前预警潜在的健康风险。我们与多家知名医院和健康机构合作，建立了专业的医疗数据库，确保健康建议的科学性和准确性。设备还支持与家人和医生的实时分享，让关爱无处不在。我们相信预防胜于治疗，通过科技的力量让每个人都能拥有更健康的生活方式，让健康管理变得简单、智能、有效。',
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
        tags: ['健康', '物联网', '智能设备'],
        team: [
            {
                id: "1",
                name: "郑华",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "医疗设备专家，拥有12年医疗器械行业经验",
                linkedin: "https://linkedin.com/in/zhenghua"
            },
            {
                id: "2",
                name: "林雪",
                role: "技术总监",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                bio: "AI算法专家，专注于健康监测技术研发",
                linkedin: "https://linkedin.com/in/linxue",
                github: "https://github.com/linxue"
            }
        ]
    },
    {
        id: '7',
        title: 'DeFi借贷协议',
        description: '构建一个去中心化的借贷协议，为用户提供更公平的金融服务。我们致力于通过区块链技术重塑传统金融体系，让每个人都能享受到透明、高效、低成本的金融服务。协议采用智能合约技术，确保所有交易过程公开透明，消除中间环节的信任成本。用户可以通过抵押数字资产获得流动性，同时为其他用户提供借贷服务并获得收益。我们建立了完善的风险评估体系，通过多维度数据分析确保资金安全。协议还支持多种数字资产，包括主流加密货币和稳定币，满足不同用户的需求。我们相信金融应该普惠大众，通过技术的力量让金融服务变得更加民主化、去中心化，为全球用户提供更公平的金融机会。',
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
        tags: ['DeFi', '借贷', '智能合约'],
        team: [
            {
                id: "1",
                name: "马强",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "金融科技专家，拥有10年传统金融和DeFi经验",
                linkedin: "https://linkedin.com/in/maqiang"
            },
            {
                id: "2",
                name: "黄丽",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                bio: "区块链技术专家，专注于智能合约安全审计",
                linkedin: "https://linkedin.com/in/huangli",
                github: "https://github.com/huangli"
            }
        ]
    },
    {
        id: '8',
        title: '虚拟现实社交平台',
        description: '创建一个沉浸式的VR社交平台，让用户在虚拟世界中自由交流和互动。我们致力于通过最先进的虚拟现实技术，为用户打造一个全新的社交体验，让距离不再是沟通的障碍。平台支持用户创建个性化的虚拟形象，在逼真的3D环境中进行面对面的交流。我们提供了丰富的虚拟场景，包括咖啡厅、海滩、太空站等，让用户可以根据心情和话题选择最适合的交流环境。平台还集成了AI技术，能够实时翻译多国语言，让全球用户无障碍沟通。我们与知名游戏开发商合作，提供各种有趣的互动游戏和活动，让社交变得更加生动有趣。我们相信技术能够拉近人与人之间的距离，通过VR的力量让社交变得更加真实、自然、充满乐趣。',
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
        tags: ['VR', '社交', '虚拟现实'],
        team: [
            {
                id: "1",
                name: "徐峰",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "VR技术专家，拥有8年虚拟现实行业经验",
                linkedin: "https://linkedin.com/in/xufeng"
            },
            {
                id: "2",
                name: "陈美",
                role: "技术总监",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                bio: "3D图形学专家，专注于VR渲染引擎开发",
                linkedin: "https://linkedin.com/in/chenmei",
                github: "https://github.com/chenmei"
            }
        ]
    },
    {
        id: '9',
        title: '智能农业系统',
        description: '开发基于物联网的智能农业系统，提高农作物产量和农业效率。我们致力于通过先进的传感器技术、大数据分析和人工智能，为现代农业提供全方位的智能化解决方案。系统能够实时监测土壤湿度、温度、光照、pH值等关键环境参数，并通过机器学习算法分析作物生长状态，为农民提供精准的种植建议。我们部署了覆盖整个农田的传感器网络，确保数据的全面性和准确性。系统还集成了自动化灌溉、施肥、病虫害预警等功能，让农业生产变得更加科学、高效、环保。我们与多家农业科研院所合作，建立了专业的农业知识库，确保建议的科学性。我们相信科技能够改变农业，通过智能化的力量让农业生产变得更加可持续，为全球粮食安全贡献力量。',
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
        tags: ['农业', '物联网', '智能系统'],
        team: [
            {
                id: "1",
                name: "刘建国",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "农业科技专家，拥有20年现代农业管理经验",
                linkedin: "https://linkedin.com/in/liujianguo"
            },
            {
                id: "2",
                name: "王芳",
                role: "技术总监",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                bio: "物联网技术专家，专注于农业传感器网络开发",
                linkedin: "https://linkedin.com/in/wangfang",
                github: "https://github.com/wangfang"
            }
        ]
    },
    {
        id: '10',
        title: '音乐版权平台',
        description: '构建一个基于区块链的音乐版权保护平台，让音乐创作者获得公平的收益。我们致力于通过区块链技术解决音乐行业的版权保护难题，让每一位音乐创作者都能获得应有的回报。平台采用智能合约技术，确保音乐版权的归属和使用记录不可篡改，同时实现自动化的收益分配。我们建立了完善的版权认证体系，支持音乐作品的原创性验证和版权登记。平台还集成了AI技术，能够自动识别和检测音乐作品的版权侵权行为，保护创作者的合法权益。我们与全球知名音乐厂牌和独立音乐人合作，提供专业的音乐推广和版权管理服务。我们相信音乐是人类的共同财富，通过技术的力量让音乐创作变得更加公平、透明，让每一位音乐人都能专注于创作，获得应有的尊重和回报。',
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
        tags: ['音乐', '版权', '区块链'],
        team: [
            {
                id: "1",
                name: "张艺",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "音乐产业专家，拥有15年音乐版权管理经验",
                linkedin: "https://linkedin.com/in/zhangyi"
            },
            {
                id: "2",
                name: "李斌",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                bio: "区块链技术专家，专注于音乐版权保护技术",
                linkedin: "https://linkedin.com/in/libin",
                github: "https://github.com/libin"
            }
        ]
    },
    {
        id: '11',
        title: '智能健身应用',
        description: '开发一款AI驱动的智能健身应用，提供个性化训练计划和实时健康监测。我们致力于通过人工智能技术，为每一位用户量身定制最适合的健身方案，让健身变得更加科学、高效、有趣。应用采用先进的机器学习算法，能够分析用户的身体数据、运动习惯和健身目标，生成个性化的训练计划。我们集成了多种传感器技术，能够实时监测用户的心率、卡路里消耗、运动强度等关键指标，并提供即时的反馈和调整建议。应用还提供了丰富的健身课程和挑战活动，让用户能够保持长期的健身动力。我们与专业健身教练和营养师合作，确保训练计划的科学性和安全性。我们相信健康的生活方式是每个人的权利，通过AI的力量让健身变得更加个性化、智能化，帮助每个人都能拥有强健的体魄和积极的生活态度。',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        creator: '0x1234567890123456789012345678901234567890',
        goalAmount: '65',
        currentAmount: '42.8',
        startTime: Date.now() - 8 * 24 * 60 * 60 * 1000, // 8天前
        endTime: Date.now() + 22 * 24 * 60 * 60 * 1000, // 22天后
        category: '健康',
        status: 'active',
        investors: 95,
        minContribution: '0.2',
        maxContribution: '6.5',
        milestones: [
            {
                id: '1',
                title: 'AI算法开发',
                description: '开发个性化训练算法',
                targetAmount: '25',
                completed: true,
                completionTime: Date.now() - 5 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '用户界面设计',
                description: '设计直观的用户界面',
                targetAmount: '45',
                completed: false
            },
            {
                id: '3',
                title: '应用发布',
                description: '正式发布健身应用',
                targetAmount: '65',
                completed: false
            }
        ],
        tags: ['健身', 'AI', '健康监测'],
        team: [
            {
                id: "1",
                name: "陈健",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "健身科技专家，拥有10年健身行业和AI技术经验",
                linkedin: "https://linkedin.com/in/chenjian"
            },
            {
                id: "2",
                name: "杨雪",
                role: "技术总监",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                bio: "AI算法专家，专注于健身数据分析和个性化推荐",
                linkedin: "https://linkedin.com/in/yangxue",
                github: "https://github.com/yangxue"
            }
        ]
    },
    {
        id: '12',
        title: '可持续时尚品牌',
        description: '创建一个专注于环保材料的时尚品牌，推动可持续时尚发展。我们致力于通过创新的环保材料和设计理念，为时尚行业带来革命性的改变，让美丽与环保完美结合。我们采用回收塑料瓶、海洋垃圾、有机棉等可持续材料，通过先进的纺织技术制作出高品质的时尚单品。每一件产品都经过严格的环境影响评估，确保从原材料到生产过程的每一个环节都符合环保标准。我们与全球知名的环保组织和设计师合作，推出限量版环保时尚系列，让消费者在追求时尚的同时也能为地球环保贡献力量。品牌还建立了透明的供应链体系，让消费者能够追踪每一件产品的环保足迹。我们相信时尚不应该以牺牲环境为代价，通过创新的力量让时尚变得更加可持续，为下一代创造一个更美好的世界。',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
        creator: '0x2345678901234567890123456789012345678901',
        goalAmount: '85',
        currentAmount: '85',
        startTime: Date.now() - 40 * 24 * 60 * 60 * 1000, // 40天前
        endTime: Date.now() - 10 * 24 * 60 * 60 * 1000, // 10天前
        category: '时尚',
        status: 'completed',
        investors: 167,
        minContribution: '0.3',
        maxContribution: '8.5',
        milestones: [
            {
                id: '1',
                title: '材料研发',
                description: '研发环保材料',
                targetAmount: '30',
                completed: true,
                completionTime: Date.now() - 30 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '产品设计',
                description: '设计时尚产品',
                targetAmount: '60',
                completed: true,
                completionTime: Date.now() - 20 * 24 * 60 * 60 * 1000
            },
            {
                id: '3',
                title: '品牌发布',
                description: '正式发布时尚品牌',
                targetAmount: '85',
                completed: true,
                completionTime: Date.now() - 10 * 24 * 60 * 60 * 1000
            }
        ],
        tags: ['时尚', '环保', '可持续'],
        team: [
            {
                id: "1",
                name: "时尚设计师",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "可持续时尚专家，拥有12年时尚设计和环保材料经验",
                linkedin: "https://linkedin.com/in/fashiondesigner"
            },
            {
                id: "2",
                name: "环保专家",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                bio: "环保材料专家，专注于可持续纺织技术研发",
                linkedin: "https://linkedin.com/in/environmentalexpert",
                github: "https://github.com/environmentalexpert"
            }
        ]
    },
    {
        id: '13',
        title: '太空探索游戏',
        description: '开发一款沉浸式的太空探索游戏，让玩家体验宇宙探索的乐趣。我们致力于通过最先进的游戏引擎和物理模拟技术，为玩家打造一个真实、壮观的宇宙探索体验。游戏采用基于真实天文数据的星系系统，包含数千个可探索的星球、恒星和星系，每个天体都有独特的物理特性和生态环境。玩家可以驾驶各种太空飞船，进行星际旅行、资源采集、外星文明探索等活动。我们与NASA和欧洲航天局合作，确保游戏中的科学内容准确可靠。游戏还支持多人合作模式，让玩家能够组建太空探险队，共同探索未知的宇宙奥秘。我们相信游戏能够激发人们对科学的兴趣，通过沉浸式的体验让玩家在娱乐中学习天文知识，感受宇宙的浩瀚和神秘。',
        image: 'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=400&h=300&fit=crop',
        creator: '0x3456789012345678901234567890123456789012',
        goalAmount: '180',
        currentAmount: '23.5',
        startTime: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2天前
        endTime: Date.now() + 28 * 24 * 60 * 60 * 1000, // 28天后
        category: '游戏',
        status: 'active',
        investors: 34,
        minContribution: '0.5',
        maxContribution: '18',
        milestones: [
            {
                id: '1',
                title: '游戏引擎',
                description: '开发3D游戏引擎',
                targetAmount: '60',
                completed: false
            },
            {
                id: '2',
                title: '宇宙系统',
                description: '构建宇宙探索系统',
                targetAmount: '120',
                completed: false
            },
            {
                id: '3',
                title: '多人模式',
                description: '实现多人游戏模式',
                targetAmount: '180',
                completed: false
            }
        ],
        tags: ['太空', '游戏', '3D'],
        team: [
            {
                id: "1",
                name: "游戏开发者",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "游戏开发专家，拥有8年3D游戏和太空模拟经验",
                linkedin: "https://linkedin.com/in/gamedeveloper"
            },
            {
                id: "2",
                name: "物理引擎专家",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                bio: "物理引擎专家，专注于太空物理模拟和渲染技术",
                linkedin: "https://linkedin.com/in/physicsengine",
                github: "https://github.com/physicsengine"
            }
        ]
    },
    {
        id: '14',
        title: '智能交通系统',
        description: '开发基于AI的智能交通管理系统，优化城市交通流量。我们致力于通过人工智能和大数据技术，为现代城市提供全方位的智能交通解决方案，让出行变得更加高效、安全、环保。系统采用先进的机器学习算法，能够实时分析交通流量数据，预测交通拥堵情况，并自动调整交通信号灯的时间配比。我们部署了覆盖整个城市的传感器网络，包括摄像头、雷达、地磁感应器等，确保数据的全面性和准确性。系统还集成了车联网技术，能够与智能汽车进行实时通信，提供个性化的路线规划和驾驶建议。我们与多家汽车制造商和交通管理部门合作，建立了完善的交通数据共享平台。我们相信智能交通是未来城市发展的重要方向，通过AI的力量让城市交通变得更加智能化，为市民创造更美好的出行体验。',
        image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
        creator: '0x4567890123456789012345678901234567890123',
        goalAmount: '250',
        currentAmount: '189.7',
        startTime: Date.now() - 22 * 24 * 60 * 60 * 1000, // 22天前
        endTime: Date.now() + 8 * 24 * 60 * 60 * 1000, // 8天后
        category: '科技',
        status: 'active',
        investors: 245,
        minContribution: '1.0',
        maxContribution: '25',
        milestones: [
            {
                id: '1',
                title: 'AI算法',
                description: '开发交通优化算法',
                targetAmount: '100',
                completed: true,
                completionTime: Date.now() - 15 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '传感器网络',
                description: '部署交通传感器网络',
                targetAmount: '175',
                completed: true,
                completionTime: Date.now() - 8 * 24 * 60 * 60 * 1000
            },
            {
                id: '3',
                title: '系统集成',
                description: '完成系统集成和测试',
                targetAmount: '250',
                completed: false
            }
        ],
        tags: ['交通', 'AI', '智慧城市'],
        team: [
            {
                id: "1",
                name: "交通专家",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "智能交通专家，拥有15年城市交通规划和AI技术经验",
                linkedin: "https://linkedin.com/in/trafficexpert"
            },
            {
                id: "2",
                name: "AI算法专家",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                bio: "AI算法专家，专注于交通流量预测和优化算法",
                linkedin: "https://linkedin.com/in/aialgorithm",
                github: "https://github.com/aialgorithm"
            }
        ]
    },
    {
        id: '15',
        title: '海洋清洁机器人',
        description: '开发自主海洋清洁机器人，帮助清理海洋塑料垃圾。我们致力于通过先进的机器人技术和人工智能，为海洋环境保护提供创新的解决方案，让我们的海洋重新变得清澈美丽。机器人采用先进的AI视觉识别技术，能够准确识别和分类各种海洋垃圾，包括塑料瓶、塑料袋、渔网等。我们设计了高效的垃圾收集系统，能够在不影响海洋生态的前提下，快速清理大面积的海洋垃圾。机器人还配备了太阳能充电系统，能够长时间在海洋中自主工作。我们与多家海洋环保组织合作，在全球多个海域进行实地测试和部署。机器人收集的数据还将用于海洋污染研究和环保政策制定。我们相信科技能够拯救海洋，通过创新的力量让海洋清洁变得更加高效、智能，为保护地球的蓝色家园贡献力量。',
        image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
        creator: '0x5678901234567890123456789012345678901234',
        goalAmount: '95',
        currentAmount: '15.2',
        startTime: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5天前
        endTime: Date.now() + 25 * 24 * 60 * 60 * 1000, // 25天后
        category: '环保',
        status: 'active',
        investors: 28,
        minContribution: '0.4',
        maxContribution: '9.5',
        milestones: [
            {
                id: '1',
                title: '机器人设计',
                description: '设计海洋清洁机器人',
                targetAmount: '35',
                completed: false
            },
            {
                id: '2',
                title: 'AI识别系统',
                description: '开发垃圾识别系统',
                targetAmount: '65',
                completed: false
            },
            {
                id: '3',
                title: '海洋测试',
                description: '进行海洋环境测试',
                targetAmount: '95',
                completed: false
            }
        ],
        tags: ['海洋', '机器人', '环保'],
        team: [
            {
                id: "1",
                name: "海洋专家",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "海洋环保专家，拥有12年海洋生态保护和机器人技术经验",
                linkedin: "https://linkedin.com/in/oceanexpert"
            },
            {
                id: "2",
                name: "机器人专家",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                bio: "机器人技术专家，专注于海洋环境下的自主导航和垃圾识别",
                linkedin: "https://linkedin.com/in/roboticsengineer",
                github: "https://github.com/roboticsengineer"
            }
        ]
    },
    {
        id: '16',
        title: '虚拟现实教育平台',
        description: '创建沉浸式VR教育平台，让学习变得更加生动有趣。我们致力于通过虚拟现实技术革命性地改变教育方式，让学习变得更加直观、互动、高效。平台提供丰富的VR教育内容，涵盖历史、地理、生物、物理、化学等多个学科，让学生能够在虚拟环境中亲身体验知识。我们与知名教育机构和专家合作，开发了高质量的VR课程，包括古埃及文明探索、人体内部结构观察、化学反应实验等。平台还支持多人协作学习，让师生能够在虚拟课堂中进行互动交流。我们采用先进的VR技术，确保学习体验的沉浸感和真实感。平台还集成了AI技术，能够根据学生的学习进度和兴趣偏好，智能推荐最适合的学习内容。我们相信VR教育是未来教育的重要方向，通过沉浸式的体验让学习变得更加生动有趣，激发学生的学习兴趣和创造力。',
        image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=300&fit=crop',
        creator: '0x6789012345678901234567890123456789012345',
        goalAmount: '130',
        currentAmount: '78.9',
        startTime: Date.now() - 16 * 24 * 60 * 60 * 1000, // 16天前
        endTime: Date.now() + 14 * 24 * 60 * 60 * 1000, // 14天后
        category: '教育',
        status: 'active',
        investors: 156,
        minContribution: '0.3',
        maxContribution: '13',
        milestones: [
            {
                id: '1',
                title: 'VR内容制作',
                description: '制作VR教育内容',
                targetAmount: '50',
                completed: true,
                completionTime: Date.now() - 10 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '平台开发',
                description: '开发VR教育平台',
                targetAmount: '90',
                completed: false
            },
            {
                id: '3',
                title: '内容库建设',
                description: '建设丰富的内容库',
                targetAmount: '130',
                completed: false
            }
        ],
        tags: ['VR', '教育', '沉浸式'],
        team: [
            {
                id: "1",
                name: "教育专家",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "教育技术专家，拥有18年教育行业和VR技术经验",
                linkedin: "https://linkedin.com/in/educationexpert"
            },
            {
                id: "2",
                name: "VR技术专家",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                bio: "VR技术专家，专注于教育内容制作和沉浸式体验设计",
                linkedin: "https://linkedin.com/in/vrexpert",
                github: "https://github.com/vrexpert"
            }
        ]
    },
    {
        id: '17',
        title: '区块链身份认证',
        description: '构建去中心化的身份认证系统，保护用户隐私和数据安全。我们致力于通过区块链技术重新定义数字身份管理，让用户能够完全掌控自己的身份信息，享受更安全、更私密的数字生活。系统采用零知识证明技术，确保用户在进行身份验证时不需要泄露任何敏感信息。我们建立了分布式的身份认证网络，消除了传统中心化系统的单点故障风险。系统支持多种身份验证方式，包括生物识别、硬件密钥、社交登录等，为用户提供灵活便捷的认证体验。我们还与多家知名企业和机构合作，建立了跨平台的信任网络，让用户能够一次认证，处处使用。系统还集成了AI技术，能够智能检测和防范身份盗用等安全威胁。我们相信隐私是每个人的基本权利，通过去中心化的力量让数字身份变得更加安全、可控，为用户创造更安心的数字环境。',
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop',
        creator: '0x7890123456789012345678901234567890123456',
        goalAmount: '160',
        currentAmount: '160',
        startTime: Date.now() - 45 * 24 * 60 * 60 * 1000, // 45天前
        endTime: Date.now() - 15 * 24 * 60 * 60 * 1000, // 15天前
        category: '科技',
        status: 'completed',
        investors: 198,
        minContribution: '0.8',
        maxContribution: '16',
        milestones: [
            {
                id: '1',
                title: '智能合约开发',
                description: '开发身份认证智能合约',
                targetAmount: '60',
                completed: true,
                completionTime: Date.now() - 35 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '安全协议',
                description: '实现安全认证协议',
                targetAmount: '110',
                completed: true,
                completionTime: Date.now() - 25 * 24 * 60 * 60 * 1000
            },
            {
                id: '3',
                title: '系统部署',
                description: '部署身份认证系统',
                targetAmount: '160',
                completed: true,
                completionTime: Date.now() - 15 * 24 * 60 * 60 * 1000
            }
        ],
        tags: ['区块链', '身份认证', '隐私'],
        team: [
            {
                id: "1",
                name: "安全专家",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "网络安全专家，拥有14年身份认证和区块链技术经验",
                linkedin: "https://linkedin.com/in/securityexpert"
            },
            {
                id: "2",
                name: "密码学专家",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                bio: "密码学专家，专注于零知识证明和隐私保护技术",
                linkedin: "https://linkedin.com/in/cryptographyexpert",
                github: "https://github.com/cryptographyexpert"
            }
        ]
    },
    {
        id: '18',
        title: '智能宠物护理',
        description: '开发智能宠物护理设备，实时监测宠物健康状况。我们致力于通过先进的传感器技术和人工智能，为宠物主人提供全方位的宠物健康管理解决方案，让宠物能够享受更健康、更快乐的生活。设备能够24小时连续监测宠物的心率、体温、活动量、睡眠质量等关键健康指标，并通过机器学习算法分析宠物的行为模式，提前预警潜在的健康问题。我们与多家知名宠物医院和兽医专家合作，建立了专业的宠物健康数据库，确保健康建议的科学性和准确性。设备还支持与宠物主人的手机应用实时同步，让主人能够随时了解宠物的健康状况。我们还提供了个性化的宠物护理建议，包括饮食、运动、医疗等方面的专业指导。我们相信宠物是家庭的重要成员，通过科技的力量让宠物护理变得更加科学、智能，为宠物和主人创造更美好的生活体验。',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=300&fit=crop',
        creator: '0x8901234567890123456789012345678901234567',
        goalAmount: '70',
        currentAmount: '8.3',
        startTime: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1天前
        endTime: Date.now() + 29 * 24 * 60 * 60 * 1000, // 29天后
        category: '健康',
        status: 'active',
        investors: 12,
        minContribution: '0.2',
        maxContribution: '7',
        milestones: [
            {
                id: '1',
                title: '设备设计',
                description: '设计宠物监测设备',
                targetAmount: '25',
                completed: false
            },
            {
                id: '2',
                title: '健康算法',
                description: '开发健康监测算法',
                targetAmount: '50',
                completed: false
            },
            {
                id: '3',
                title: '产品测试',
                description: '进行产品测试和优化',
                targetAmount: '70',
                completed: false
            }
        ],
        tags: ['宠物', '健康监测', '智能设备'],
        team: [
            {
                id: "1",
                name: "宠物专家",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "宠物健康专家，拥有10年宠物医疗和智能设备开发经验",
                linkedin: "https://linkedin.com/in/petexpert"
            },
            {
                id: "2",
                name: "硬件工程师",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                bio: "硬件工程师，专注于宠物健康监测传感器和物联网技术",
                linkedin: "https://linkedin.com/in/hardwareengineer",
                github: "https://github.com/hardwareengineer"
            }
        ]
    },
    {
        id: '19',
        title: '失败项目示例',
        description: '这是一个失败的众筹项目示例，用于展示平台的不同状态。该项目原本计划开发一款创新的智能手表，但由于技术难度超出预期、团队经验不足、市场调研不够充分等多重因素，最终未能达到预期目标。项目在开发过程中遇到了核心技术瓶颈，无法实现最初承诺的功能特性。同时，团队在项目管理、资金使用、市场推广等方面也存在诸多问题。虽然项目最终失败了，但这次经历为团队积累了宝贵的经验教训，也为其他创业者提供了重要的参考价值。我们相信失败是成功之母，每一次失败都是成长的机会。通过这个案例，我们希望提醒所有创业者要更加谨慎地规划项目，充分评估技术可行性和市场风险，确保项目的可持续发展。',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
        creator: '0x9012345678901234567890123456789012345678',
        goalAmount: '200',
        currentAmount: '45.6',
        startTime: Date.now() - 50 * 24 * 60 * 60 * 1000, // 50天前
        endTime: Date.now() - 20 * 24 * 60 * 60 * 1000, // 20天前
        category: '科技',
        status: 'failed',
        investors: 67,
        minContribution: '1.0',
        maxContribution: '20',
        milestones: [
            {
                id: '1',
                title: '概念验证',
                description: '完成概念验证',
                targetAmount: '50',
                completed: true,
                completionTime: Date.now() - 40 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '原型开发',
                description: '开发产品原型',
                targetAmount: '100',
                completed: false
            },
            {
                id: '3',
                title: '产品发布',
                description: '正式发布产品',
                targetAmount: '200',
                completed: false
            }
        ],
        tags: ['失败', '示例', '科技'],
        team: [
            {
                id: "1",
                name: "失败创业者",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "智能硬件创业者，拥有5年产品开发经验，从失败中学习成长",
                linkedin: "https://linkedin.com/in/failedentrepreneur"
            },
            {
                id: "2",
                name: "技术负责人",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                bio: "硬件工程师，专注于智能设备开发，积累了宝贵的失败经验",
                linkedin: "https://linkedin.com/in/techlead",
                github: "https://github.com/techlead"
            }
        ]
    },
    {
        id: '20',
        title: '取消项目示例',
        description: '这是一个被取消的众筹项目示例，展示项目取消状态。该项目原本计划开发一款创新的金融科技产品，但在众筹过程中，团队发现市场环境发生了重大变化，原有的商业模式已经不再适用。同时，监管政策的不确定性也给项目带来了巨大的风险。经过深思熟虑，团队决定主动取消项目，将所有筹集到的资金全额退还给支持者。虽然项目被取消了，但团队展现出了高度的责任感和诚信精神，赢得了社区的理解和尊重。这次经历让团队更加深刻地认识到市场调研和风险评估的重要性。我们相信诚信是创业的基石，即使面临困难，也要以负责任的态度对待每一位支持者。通过这个案例，我们希望提醒所有创业者要时刻关注市场变化，及时调整策略，确保项目的可行性和合规性。',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
        creator: '0x0123456789012345678901234567890123456789',
        goalAmount: '90',
        currentAmount: '23.4',
        startTime: Date.now() - 30 * 24 * 60 * 60 * 1000, // 30天前
        endTime: Date.now() - 5 * 24 * 60 * 60 * 1000, // 5天前
        category: '金融',
        status: 'cancelled',
        investors: 34,
        minContribution: '0.5',
        maxContribution: '9',
        milestones: [
            {
                id: '1',
                title: '市场调研',
                description: '完成市场调研',
                targetAmount: '30',
                completed: true,
                completionTime: Date.now() - 25 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: '产品设计',
                description: '设计产品方案',
                targetAmount: '60',
                completed: false
            },
            {
                id: '3',
                title: '产品开发',
                description: '开发产品功能',
                targetAmount: '90',
                completed: false
            }
        ],
        tags: ['取消', '示例', '金融'],
        team: [
            {
                id: "1",
                name: "金融创业者",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "金融科技创业者，拥有8年金融行业经验，注重风险控制",
                linkedin: "https://linkedin.com/in/fintechentrepreneur"
            },
            {
                id: "2",
                name: "合规专家",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                bio: "金融合规专家，专注于监管政策研究和风险管控",
                linkedin: "https://linkedin.com/in/complianceexpert",
                github: "https://github.com/complianceexpert"
            }
        ]
    },
    {
        id: '21',
        title: '智能农业无人机',
        description: '开发智能农业无人机系统，实现精准农业和自动化农田管理。我们致力于通过先进的无人机技术和人工智能，为现代农业提供革命性的解决方案，让农业生产变得更加高效、精准、可持续。系统采用多旋翼无人机平台，配备高精度摄像头、多光谱传感器、激光雷达等先进设备，能够实时监测农田的作物生长状态、土壤湿度、病虫害情况等关键信息。我们开发了智能飞行控制系统，能够实现自主飞行、精准定位、自动避障等功能。系统还集成了AI图像识别技术，能够准确识别作物病害、杂草分布、营养缺乏等问题，为农民提供精准的农业管理建议。我们与多家农业科研院所合作，建立了专业的农业知识库，确保建议的科学性和实用性。我们相信科技能够改变农业，通过智能化的力量让农业生产变得更加精准高效，为全球粮食安全贡献力量。',
        image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop',
        creator: '0x1111111111111111111111111111111111111111',
        goalAmount: '140',
        currentAmount: '67.3',
        startTime: Date.now() - 14 * 24 * 60 * 60 * 1000, // 14天前
        endTime: Date.now() + 16 * 24 * 60 * 60 * 1000, // 16天后
        category: '农业',
        status: 'active',
        investors: 112,
        minContribution: '0.5',
        maxContribution: '14',
        milestones: [
            {
                id: '1',
                title: '无人机设计',
                description: '设计农业专用无人机',
                targetAmount: '50',
                completed: true,
                completionTime: Date.now() - 10 * 24 * 60 * 60 * 1000
            },
            {
                id: '2',
                title: 'AI识别系统',
                description: '开发作物识别和监测系统',
                targetAmount: '95',
                completed: false
            },
            {
                id: '3',
                title: '批量生产',
                description: '开始批量生产无人机',
                targetAmount: '140',
                completed: false
            }
        ],
        tags: ['农业', '无人机', 'AI', '精准农业'],
        team: [
            {
                id: "1",
                name: "农业专家",
                role: "CEO",
                avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
                bio: "精准农业专家，拥有16年现代农业和无人机技术经验",
                linkedin: "https://linkedin.com/in/agricultureexpert"
            },
            {
                id: "2",
                name: "无人机专家",
                role: "CTO",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                bio: "无人机技术专家，专注于农业无人机和AI图像识别技术",
                linkedin: "https://linkedin.com/in/droneexpert",
                github: "https://github.com/droneexpert"
            }
        ]
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
    return `${formatEther(parseEther(amount))} USDT`
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
