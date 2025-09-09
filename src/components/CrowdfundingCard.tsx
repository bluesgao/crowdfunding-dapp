import { useTranslation } from 'react-i18next'
import { CrowdfundingProject } from '../types/crowdfunding'
import { formatAmount, getTimeRemaining, getProgressPercentage } from '../utils/crowdfundingContract'

interface CrowdfundingCardProps {
  project: CrowdfundingProject
  onView?: (project: CrowdfundingProject) => void
  onInvest?: (project: CrowdfundingProject) => void
  showInvestButton?: boolean
}

export default function CrowdfundingCard({ 
  project, 
  onView, 
  onInvest, 
  showInvestButton = true 
}: CrowdfundingCardProps) {
  const { t } = useTranslation()
  const progressPercentage = getProgressPercentage(project.currentAmount, project.goalAmount)
  const timeRemaining = getTimeRemaining(project.endTime)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'completed': return 'bg-blue-100 text-blue-800'
      case 'failed': return 'bg-red-100 text-red-800'
      case 'cancelled': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t('project.status.active')
      case 'completed': return t('project.status.completed')
      case 'failed': return t('project.status.failed')
      case 'cancelled': return t('project.status.cancelled')
      default: return t('common.unknown')
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-md">
      {/* 图片 */}
      <div className="relative overflow-hidden">
        <img
          alt={project.title}
          src={project.image}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjMzc0MTUxIi8+CjxwYXRoIGQ9Ik0xNzUgMTI1SDIyNVYxNzVIMTc1VjEyNVoiIGZpbGw9IiM2QjcyODAiLz4KPHN2ZyB4PSIxNzUiIHk9IjEyNSIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIiB2aWV3Qm94PSIwIDAgMjQgMjQiIGZpbGw9Im5vbmUiPgo8cGF0aCBkPSJNMTIgMkM2LjQ4IDIgMiA2LjQ4IDIgMTJTNi40OCAyMiAxMiAyMlMyMiAxNy41MiAyMiAxMlMxNy41MiAyIDEyIDJaTTEzIDE3SDExVjE1SDEzVjE3Wk0xMyAxM0gxMVY3SDEzVjEzWiIgZmlsbD0iIzlDQTNBRiIvPgo8L3N2Zz4KPC9zdmc+'
          }}
        />
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
            {getStatusText(project.status)}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span className="bg-black/50 text-white px-2 py-1 rounded-full text-sm">
            {project.category}
          </span>
        </div>
      </div>

      {/* 内容 */}
      <div className="p-6 sm:p-8">
        <h3 className="font-bold text-xl sm:text-2xl text-white mb-3 line-clamp-2">{project.title}</h3>
        <p className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-3">{project.description}</p>
        
        {/* 进度条 */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>进度</span>
            <span>{progressPercentage.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* 金额信息 */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <div className="text-sm sm:text-base text-gray-300">{t('project.raised')}</div>
            <div className="font-bold text-lg sm:text-xl text-blue-400">{formatAmount(project.currentAmount)}</div>
          </div>
          <div>
            <div className="text-sm sm:text-base text-gray-300">{t('project.goal')}</div>
            <div className="font-bold text-lg sm:text-xl text-white">{formatAmount(project.goalAmount)}</div>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="flex justify-between text-sm text-gray-300 mb-4">
          <span>{project.investors} {t('project.investorsCount')}</span>
          <span>{timeRemaining}</span>
        </div>

        {/* 标签 */}
        {project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* 操作按钮 */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => onView?.(project)}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-0"
          >
            {t('common.viewDetails')}
          </button>
          {showInvestButton && project.status === 'active' && (
            <button
              onClick={() => onInvest?.(project)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-0"
            >
              {t('project.invest')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
