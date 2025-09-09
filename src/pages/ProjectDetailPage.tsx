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
  const [investModalVisible, setInvestModalVisible] = useState(false)


  useEffect(() => {
    // 页面加载时滚动到顶部
    const scrollContainer = document.querySelector('.scroll-container')
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
    
    if (id) {
      loadProject()
    }
  }, [id]) // eslint-disable-line react-hooks/exhaustive-deps

  const loadProject = async () => {
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


  if (!project) {
    return (
      <div className="min-h-screen relative overflow-x-hidden">
        {/* 简化背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
        
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
    <div className="min-h-screen relative overflow-x-hidden">
      {/* 简化背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
      
      <div className="relative container mx-auto px-3 sm:px-4 py-4 sm:py-8 max-w-4xl">
        {/* 面包屑导航 */}
        <div className="mb-6">
          <div className="px-2 py-2">
            <nav className="flex items-center space-x-3 text-base">
              {/* 首页链接 */}
              <button
                onClick={() => navigate('/')}
                className="flex items-center text-gray-300 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
              
              {/* 分隔符 */}
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              
              {/* 项目标题 */}
              <span className="text-white font-semibold truncate max-w-xs sm:max-w-md">
                {project?.title || t('common.loading')}
              </span>
            </nav>
          </div>
        </div>

        {/* 项目图片和基本信息 */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* 项目图片 */}
            <div className="order-2 lg:order-1 relative">
              <img
                alt={project.title}
                src={project.image}
                className="w-full h-64 sm:h-80 object-cover rounded-xl"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDgwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0zNTAgMTUwSDQ1MFYyNTBIMzUwVjE1MFoiIGZpbGw9IiM2QjcyODAiLz4KPHN2ZyB4PSIzNTAiIHk9IjE1MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxwYXRoIGQ9Ik0xMiAyQzYuNDggMiAyIDYuNDggMiAxMlM2LjQ4IDIyIDEyIDIyUzIyIDE3LjUyIDIyIDEyUzE3LjUyIDIgMTIgMlpNMTMgMTdIMTFWMTVIMTNWMTdaTTEzIDEzSDExVjdIMTNWMTNaIiBmaWxsPSIjOUNBM0FGIi8+Cjwvc3ZnPgo8L3N2Zz4='
                }}
              />
              {/* 状态覆盖层 */}
              <div className="absolute top-4 left-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold shadow-lg ${getStatusColor(project.status)}`}>
                  {getStatusText(project.status)}
                </span>
              </div>
            </div>
            
            {/* 项目基本信息 */}
            <div className="order-1 lg:order-2 flex flex-col justify-center space-y-6">
              {/* 标题 */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                  {project.title}
                </h1>
              </div>
              
              {/* 项目标签 */}
              {project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-1.5 rounded-full text-sm font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              
              {/* 项目描述 */}
              <div>
                <p className="text-gray-300 text-lg leading-relaxed line-clamp-4">
                  {project.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 项目团队 */}
        <div className="mb-8">
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white mb-4">{t('projectDetail.team.title')}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.team && project.team.length > 0 ? project.team.map((member) => (
                <div key={member.id} className="text-center">
                  <div className="mb-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-gray-600"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNDAiIGN5PSI0MCIgcj0iNDAiIGZpbGw9IiMzNzQxNTEiLz4KPHN2ZyB4PSIyMCIgeT0iMjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIj4KPHBhdGggZD0iTTEyIDEyQzE0LjIwOTEgMTIgMTYgMTAuMjA5MSAxNiA4QzE2IDUuNzkwODYgMTQuMjA5MSA0IDEyIDRDOS43OTA4NiA0IDggNS43OTA4NiA4IDhDOCAxMC4yMDkxIDkuNzkwODYgMTIgMTIgMTJaIiBmaWxsPSIjOUNBM0FGIi8+CjxwYXRoIGQ9Ik0xMiAxNEM5LjMzIDE0IDcgMTYuMzMgNyAxOUgxN0MxNyAxNi4zMyAxNC42NyAxNCAxMiAxNFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+Cjwvc3ZnPg=='
                      }}
                    />
                  </div>
                  <h4 className="text-base font-semibold text-white mb-1">{member.name}</h4>
                  <p className="text-blue-400 text-sm">{member.role}</p>
                </div>
              )) : (
                <div className="col-span-full text-center text-gray-400 py-8">
                  <p>暂无团队信息</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 进度信息 */}
        <div className="mb-8">
          <div className="p-6 sm:p-8">
            <h3 className="text-lg font-semibold text-white mb-6">{t('projectDetail.fundingProgress')}</h3>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-2xl font-bold text-white">
                  {Number(project.currentAmount).toFixed(2)} USDT
                </div>
                <div className="text-sm text-gray-400">
                  {Number(project.goalAmount).toFixed(2)} USDT
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-400">
                  {progressPercentage.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-400">
                  {project.investors} {t('projectDetail.progress.investors')}
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            
            <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
              <span>{t('projectDetail.progress.startDate')}: {new Date(project.startTime).toLocaleDateString()}</span>
              <span>{t('projectDetail.progress.endDate')}: {new Date(project.endTime).toLocaleDateString()}</span>
            </div>
            
            {/* 投资信息 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">投资范围</div>
                <div className="text-lg font-semibold text-white">
                  {Number(project.minContribution).toFixed(2)} - {Number(project.maxContribution).toFixed(2)} USDT
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-400 mb-1">{t('projectDetail.progress.timeLeft')}</div>
                <div className="text-lg font-semibold text-blue-400">
                  {timeRemaining > 0 ? t('projectDetail.progress.daysLeft', { days: timeRemaining }) : t('projectDetail.progress.ended')}
                </div>
              </div>
              <div className="text-center">
                {project.status === 'active' ? (
                  <button
                    onClick={() => setInvestModalVisible(true)}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    {t('projectDetail.investNow')}
                  </button>
                ) : (
                  <>
                    <div className="text-sm text-gray-400 mb-1">状态</div>
                    <div className="text-lg font-semibold text-gray-500">
                      {getStatusText(project.status)}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 里程碑 */}
        <div className="mb-8">
          <div className="p-6 sm:p-8">
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
                      {Number(milestone.targetAmount).toFixed(2)} USDT
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
