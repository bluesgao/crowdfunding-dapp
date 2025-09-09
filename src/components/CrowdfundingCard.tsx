import { useTranslation } from 'react-i18next'
import { CrowdfundingProject } from '../types/crowdfunding'
import { formatAmount, getProgressPercentage } from '../utils/crowdfundingContract'

interface CrowdfundingCardProps {
  project: CrowdfundingProject
  onView?: (project: CrowdfundingProject) => void
}

export default function CrowdfundingCard({ 
  project, 
  onView
}: CrowdfundingCardProps) {
  const { t } = useTranslation()
  const progressPercentage = getProgressPercentage(project.currentAmount, project.goalAmount)

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
        
        {/* 项目标签 */}
        {project.tags.length > 0 && (
          <div className="absolute bottom-3 left-3 right-3">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
              {project.tags.length > 2 && (
                <span className="bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  +{project.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 内容 */}
      <div className="p-6 sm:p-8">
        <h3 className="font-bold text-xl sm:text-2xl text-white mb-4 line-clamp-2">{project.title}</h3>
        
        {/* 金额信息 */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-sm text-gray-400">{t('project.raised')}</div>
            <div className="font-bold text-lg text-blue-400">{formatAmount(project.currentAmount)}</div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400">{t('project.goal')}</div>
            <div className="font-bold text-lg text-white">{formatAmount(project.goalAmount)}</div>
          </div>
        </div>

        {/* 进度条 */}
        <div className="mb-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* 日期信息 */}
        <div className="flex justify-between text-xs text-gray-400 mb-4">
          <span>{t('projectDetail.card.startDate')}: {new Date(project.startTime).toLocaleDateString()}</span>
          <span>{t('projectDetail.card.endDate')}: {new Date(project.endTime).toLocaleDateString()}</span>
        </div>

        {/* 操作按钮 */}
        <div className="flex justify-center">
          <button
            onClick={() => onView?.(project)}
            className="w-full bg-gray-700 hover:bg-gray-600 text-gray-200 py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-0"
          >
            {t('common.viewDetails')}
          </button>
        </div>
      </div>
    </div>
  )
}
