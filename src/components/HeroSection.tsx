import { useTranslation } from 'react-i18next'
import type { ProjectStats } from '../types/crowdfunding'

interface HeroSectionProps {
  stats: ProjectStats | null
}

export default function HeroSection({ stats }: HeroSectionProps) {
  const { t } = useTranslation()

  return (
    <div className="relative mb-8 sm:mb-10">
      {/* 内容区域 */}
      <div className="relative text-center py-3 sm:py-4">
          {/* 主标题 */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
              {t('header.title')}
            </h1>
            
            {/* 现代化分隔线 */}
            <div className="flex items-center justify-center">
              <div className="w-16 h-px bg-gray-600"></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full mx-4"></div>
              <div className="w-16 h-px bg-gray-600"></div>
            </div>
          </div>
          
          {/* 副标题 */}
          <div className="mb-8 sm:mb-10">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              {t('header.subtitle')}
            </p>
          </div>
          
          {/* 统计数据 */}
          {stats && (
            <div className="mb-4 sm:mb-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                {/* 总项目数 */}
                <div className="p-3 sm:p-4 text-center bg-gray-800 rounded-lg border border-gray-700 min-h-[80px] sm:min-h-[90px] flex flex-col justify-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{stats.totalProjects}</div>
                  <div className="text-xs sm:text-sm text-gray-300 leading-tight h-8 sm:h-10 flex items-center justify-center">{t('stats.totalProjects')}</div>
                </div>
                
                {/* 进行中项目 */}
                <div className="p-3 sm:p-4 text-center bg-blue-900 rounded-lg border border-blue-700 min-h-[80px] sm:min-h-[90px] flex flex-col justify-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{stats.activeProjects}</div>
                  <div className="text-xs sm:text-sm text-gray-300 leading-tight h-8 sm:h-10 flex items-center justify-center">{t('stats.activeProjects')}</div>
                </div>
                
                {/* 总筹集 */}
                <div className="p-3 sm:p-4 text-center bg-green-900 rounded-lg border border-green-700 min-h-[80px] sm:min-h-[90px] flex flex-col justify-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{stats.totalRaised}</div>
                  <div className="text-xs sm:text-sm text-gray-300 leading-tight h-8 sm:h-10 flex items-center justify-center">{t('stats.totalRaised')}</div>
                </div>
                
                {/* 总投资者 */}
                <div className="p-3 sm:p-4 text-center bg-purple-900 rounded-lg border border-purple-700 min-h-[80px] sm:min-h-[90px] flex flex-col justify-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{stats.totalInvestors}</div>
                  <div className="text-xs sm:text-sm text-gray-300 leading-tight h-8 sm:h-10 flex items-center justify-center">{t('stats.totalInvestors')}</div>
                </div>
                
                {/* 成功率 */}
                <div className="p-3 sm:p-4 text-center bg-orange-900 rounded-lg border border-orange-700 min-h-[80px] sm:min-h-[90px] flex flex-col justify-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{stats.successRate}%</div>
                  <div className="text-xs sm:text-sm text-gray-300 leading-tight h-8 sm:h-10 flex items-center justify-center">{t('stats.successRate')}</div>
                </div>
                
                {/* 平均投资 */}
                <div className="p-3 sm:p-4 text-center bg-cyan-900 rounded-lg border border-cyan-700 min-h-[80px] sm:min-h-[90px] flex flex-col justify-center">
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{stats.averageInvestment}</div>
                  <div className="text-xs sm:text-sm text-gray-300 leading-tight h-8 sm:h-10 flex items-center justify-center">{t('stats.averageInvestment')}</div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
