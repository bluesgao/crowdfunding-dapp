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
      <div className="relative text-center py-3 sm:py-4 px-6 sm:px-12">
          {/* 主标题 */}
          <div className="mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent leading-tight mb-4">
              {t('header.title')}
            </h1>
            
            {/* 现代化分隔线 */}
            <div className="flex items-center justify-center">
              <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-500/60"></div>
              <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-4 shadow-lg"></div>
              <div className="w-16 h-px bg-gradient-to-l from-transparent to-purple-500/60"></div>
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
                <div className="p-2 sm:p-3 text-center bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700/20">
                  <div className="text-base sm:text-lg font-bold text-white mb-1">{stats.totalProjects}</div>
                  <div className="text-xs text-gray-300">{t('stats.totalProjects')}</div>
                </div>
                
                {/* 进行中项目 */}
                <div className="p-2 sm:p-3 text-center bg-blue-900/20 backdrop-blur-sm rounded-lg border border-blue-700/20">
                  <div className="text-base sm:text-lg font-bold text-white mb-1">{stats.activeProjects}</div>
                  <div className="text-xs text-gray-300">{t('stats.activeProjects')}</div>
                </div>
                
                {/* 总筹集 */}
                <div className="p-2 sm:p-3 text-center bg-green-900/20 backdrop-blur-sm rounded-lg border border-green-700/20">
                  <div className="text-base sm:text-lg font-bold text-white mb-1">{stats.totalRaised}</div>
                  <div className="text-xs text-gray-300">{t('stats.totalRaised')}</div>
                </div>
                
                {/* 总投资者 */}
                <div className="p-2 sm:p-3 text-center bg-purple-900/20 backdrop-blur-sm rounded-lg border border-purple-700/20">
                  <div className="text-base sm:text-lg font-bold text-white mb-1">{stats.totalInvestors}</div>
                  <div className="text-xs text-gray-300">{t('stats.totalInvestors')}</div>
                </div>
                
                {/* 成功率 */}
                <div className="p-2 sm:p-3 text-center bg-orange-900/20 backdrop-blur-sm rounded-lg border border-orange-700/20">
                  <div className="text-base sm:text-lg font-bold text-white mb-1">{stats.successRate}%</div>
                  <div className="text-xs text-gray-300">{t('stats.successRate')}</div>
                </div>
                
                {/* 平均投资 */}
                <div className="p-2 sm:p-3 text-center bg-cyan-900/20 backdrop-blur-sm rounded-lg border border-cyan-700/20">
                  <div className="text-base sm:text-lg font-bold text-white mb-1">{stats.averageInvestment}</div>
                  <div className="text-xs text-gray-300">{t('stats.averageInvestment')}</div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}
