import type { ProjectStats as ProjectStatsType } from '../types/project'

interface ProjectStatsProps {
  stats: ProjectStatsType | null
}

export default function ProjectStats({ stats }: ProjectStatsProps) {

  if (stats === null || stats === undefined) {
    return null
  }

  return (
    <div className="mb-6 sm:mb-8 space-y-6">
      {/* 核心统计数据 - 突出显示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-3 mx-8 sm:mx-16 lg:mx-24">
        {/* 已筹集总额 */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-blue-900/20 to-blue-800/10 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
              {stats.totalRaised}
            </div>
            <div className="flex items-center justify-center">
              <div className="text-blue-400 text-lg font-bold">已筹集总额 (ETH)</div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse ml-2"></div>
            </div>
          </div>
        </div>
        
        {/* 总投资人数 */}
        <div className="group relative overflow-hidden bg-gradient-to-br from-green-900/20 to-green-800/10 rounded-xl p-4 sm:p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 group-hover:text-green-300 transition-colors duration-300">
              {stats.totalInvestors.toLocaleString()}
            </div>
            <div className="flex items-center justify-center">
              <div className="text-green-400 text-lg font-bold">总投资人数 (人)</div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse ml-2"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 项目状态统计 - 网格布局 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* 总项目数 */}
        <div className="group relative bg-gray-800/50 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:scale-[1.05] hover:bg-gray-700/50 cursor-pointer">
          <div className="text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400 mb-1 group-hover:text-blue-300 transition-colors duration-300">
              {stats.totalProjects}
            </div>
            <div className="text-xs sm:text-sm text-blue-400 font-bold group-hover:text-blue-300 transition-colors duration-300">总项目</div>
          </div>
        </div>
        
        {/* 待开始项目 */}
        <div className="group relative bg-gray-800/50 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:scale-[1.05] hover:bg-gray-700/50 cursor-pointer">
          <div className="text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-yellow-400 mb-1 group-hover:text-yellow-300 transition-colors duration-300">
              {stats.pendingProjects || 0}
            </div>
            <div className="text-xs sm:text-sm text-yellow-400 font-bold group-hover:text-yellow-300 transition-colors duration-300">待开始</div>
          </div>
        </div>
        
        {/* 待上链项目 */}
        <div className="group relative bg-gray-800/50 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:scale-[1.05] hover:bg-gray-700/50 cursor-pointer">
          <div className="text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-orange-400 mb-1 group-hover:text-orange-300 transition-colors duration-300">
              {stats.deployingProjects || 0}
            </div>
            <div className="text-xs sm:text-sm text-orange-400 font-bold group-hover:text-orange-300 transition-colors duration-300">待上链</div>
          </div>
        </div>
        
        {/* 进行中项目 */}
        <div className="group relative bg-gray-800/50 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:scale-[1.05] hover:bg-gray-700/50 cursor-pointer">
          <div className="text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-400 mb-1 group-hover:text-blue-300 transition-colors duration-300">
              {stats.activeProjects || 0}
            </div>
            <div className="text-xs sm:text-sm text-blue-400 font-bold group-hover:text-blue-300 transition-colors duration-300">进行中</div>
          </div>
        </div>
        
        {/* 成功项目 */}
        <div className="group relative bg-gray-800/50 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:scale-[1.05] hover:bg-gray-700/50 cursor-pointer">
          <div className="text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-400 mb-1 group-hover:text-green-300 transition-colors duration-300">
              {stats.successProjects || 0}
            </div>
            <div className="text-xs sm:text-sm text-green-400 font-bold group-hover:text-green-300 transition-colors duration-300">成功</div>
          </div>
        </div>
        
        {/* 失败项目 */}
        <div className="group relative bg-gray-800/50 rounded-lg p-3 sm:p-4 transition-all duration-300 hover:scale-[1.05] hover:bg-gray-700/50 cursor-pointer">
          <div className="text-center">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-400 mb-1 group-hover:text-red-300 transition-colors duration-300">
              {stats.failedProjects || 0}
            </div>
            <div className="text-xs sm:text-sm text-red-400 font-bold group-hover:text-red-300 transition-colors duration-300">失败</div>
          </div>
        </div>
      </div>
    </div>
  )
}
