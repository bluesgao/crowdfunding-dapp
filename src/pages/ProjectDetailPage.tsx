import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { CrowdfundingProject } from '../types/crowdfunding'
import { crowdfundingContract } from '../utils/crowdfundingContract'
import InvestModal from '../components/InvestModal'

export default function ProjectDetailPage() {
  const { t } = useTranslation()
  const { address } = useAccount()
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [project, setProject] = useState<CrowdfundingProject | null>(null)
  const [loading, setLoading] = useState(true)
  const [investModalVisible, setInvestModalVisible] = useState(false)


  useEffect(() => {
    if (id) {
      loadProject()
    }
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadProject = async () => {
    setLoading(true)
    try {
      const projects = await crowdfundingContract.getAllProjects()
      const foundProject = projects.find(p => p.id === id)
      if (foundProject) {
        setProject(foundProject)
      } else {
        // 项目不存在，重定向到首页
        navigate('/')
      }
    } catch (error) {
      console.error('Failed to load project:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleInvest = async (project: CrowdfundingProject, amount: string) => {
    if (!address) {
      alert(t('wallet.pleaseConnect'))
      return
    }

    const success = await crowdfundingContract.investInProject(project.id, amount, address)
    if (success) {
      await loadProject() // 重新加载数据
    } else {
      throw new Error(t('investment.investmentFailed'))
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-white'
      case 'completed': return 'bg-blue-600 text-white'
      case 'failed': return 'bg-red-600 text-white'
      case 'cancelled': return 'bg-gray-600 text-white'
      default: return 'bg-gray-600 text-white'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t('project.status.active')
      case 'completed': return t('project.status.completed')
      case 'failed': return t('project.status.failed')
      case 'cancelled': return t('project.status.cancelled')
      default: return '未知'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* 全局背景系统 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-purple-600/12 to-pink-600/8"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/6 via-blue-500/8 to-purple-500/6 blur-3xl"></div>
        
        {/* 全局浮动光球 */}
        <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-purple-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 -left-8 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-1/4 -right-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-300">{t('common.loading')}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen relative">
        {/* 全局背景系统 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-purple-600/12 to-pink-600/8"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/6 via-blue-500/8 to-purple-500/6 blur-3xl"></div>
        
        {/* 全局浮动光球 */}
        <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-purple-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 -left-8 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-1/4 -right-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="relative container mx-auto px-3 sm:px-4 py-4 sm:py-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">😞</div>
            <h3 className="text-2xl font-semibold text-gray-400 mb-2">项目未找到</h3>
            <p className="text-gray-500 mb-6">您访问的项目不存在或已被删除</p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    )
  }

  const progressPercentage = (Number(project.currentAmount) / Number(project.goalAmount)) * 100
  const timeRemaining = Math.ceil((Number(project.endTime) - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <div className="min-h-screen relative">
      {/* 全局背景系统 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-purple-600/12 to-pink-600/8"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/6 via-blue-500/8 to-purple-500/6 blur-3xl"></div>
      
      {/* 全局浮动光球 */}
      <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-purple-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 -left-8 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute top-1/4 -right-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      <div className="relative container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
        {/* 面包屑导航 */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gray-900/10 backdrop-blur-sm rounded-xl border border-gray-700/10"></div>
          <div className="relative px-4 py-3">
            <nav className="flex items-center space-x-3 text-sm">
              {/* 首页链接 */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-400 hover:text-white transition-colors group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              
              {/* 分隔符 */}
              <div className="flex items-center">
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* 项目标题 */}
              <span className="text-white font-medium truncate max-w-xs sm:max-w-md">
                {project?.title || t('common.loading')}
              </span>
            </nav>
          </div>
        </div>

        {/* 项目图片 */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-700/20"></div>
          <div className="relative p-4">
            <img
              alt={project.title}
              src={project.image}
              className="w-full h-64 sm:h-80 object-cover rounded-xl"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0zNTAgMTUwSDQ1MFYyNTBIMzUwVjE1MFoiIGZpbGw9IiM2QjcyODAiLz4KPHN2ZyB4PSIzNTAiIHk9IjE1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMlM2LjQ4IDIyIDEyIDIyUzIyIDE3LjUyIDIyIDEyUzE3LjUyIDIgMTIgMlpNMTMgMTdIMTFWMTVIMTNWMTdaTTEzIDEzSDExVjdIMTNWMTNaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo8L3N2Zz4='
              }}
            />
          </div>
        </div>

        {/* 项目基本信息 */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-700/20"></div>
          <div className="relative p-6 sm:p-8">
            {/* 头部信息 */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
                <span className="text-gray-400 text-sm">•</span>
                <span className="text-gray-400 text-sm">{project.category}</span>
              </div>
              
              {/* 项目标签 */}
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-500/30">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            
            {/* 标题和描述 */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{project.title}</h1>
              <p className="text-gray-300 text-lg leading-relaxed">{project.description}</p>
            </div>
          </div>
        </div>

        {/* 进度信息 */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-700/20"></div>
          <div className="relative p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold text-white">
                  {Number(project.currentAmount).toFixed(2)} ETH
                </div>
                <div className="text-sm text-gray-400">
                  已筹集 / {Number(project.goalAmount).toFixed(2)} ETH 目标
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-blue-400">
                  {progressPercentage.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">
                  {project.investors} 位投资者
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
              <span>开始: {new Date(project.startTime).toLocaleDateString()}</span>
              <span className="text-blue-400 font-medium">
                {timeRemaining > 0 ? `剩余 ${timeRemaining} 天` : '已结束'}
              </span>
              <span>结束: {new Date(project.endTime).toLocaleDateString()}</span>
            </div>
            
            {/* 投资信息 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">投资范围</div>
                <div className="text-lg font-semibold text-white">
                  {Number(project.minContribution).toFixed(2)} - {Number(project.maxContribution).toFixed(2)} ETH
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">风险提示</div>
                <div className="text-xs text-yellow-400">投资有风险，请谨慎决策</div>
              </div>
            </div>
            
            {/* 投资按钮 */}
            {project.status === 'active' && (
              <div className="flex justify-center">
                <button
                  onClick={() => setInvestModalVisible(true)}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  {t('projectDetail.investNow')}
                </button>
              </div>
            )}
          </div>
        </div>



        {/* 里程碑 */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm rounded-2xl border border-gray-700/20"></div>
          <div className="relative p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white mb-4">项目里程碑</h3>
            <div className="space-y-3">
              {project.milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0">
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                      milestone.completed ? 'bg-green-500 text-white' : 'bg-gray-600 text-gray-300'
                    }`}>
                      {milestone.completed ? '✓' : index + 1}
                    </div>
                    <span className="text-gray-300">{milestone.description}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-white">
                      {Number(milestone.targetAmount).toFixed(2)} ETH
                    </div>
                    {milestone.completed && milestone.completionTime && (
                      <div className="text-xs text-green-400">
                        {new Date(milestone.completionTime).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* 投资模态框 */}
      {project && (
        <InvestModal
          project={project}
          visible={investModalVisible}
          onClose={() => setInvestModalVisible(false)}
          onInvest={handleInvest}
        />
      )}
    </div>
  )
}
