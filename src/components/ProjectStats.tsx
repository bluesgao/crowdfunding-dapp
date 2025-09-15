import type { ProjectStats as ProjectStatsType } from '../types/project'

interface ProjectStatsProps {
  stats: ProjectStatsType | null
}

export default function ProjectStats({ stats }: ProjectStatsProps) {

  if (stats === null || stats === undefined) {
    return null
  }

  return (
    <div className="mb-4 sm:mb-6 space-y-4">
      {/* 其他统计数据 */}
      <div>
        <div className="grid grid-cols-2 gap-6 sm:gap-6">
          {/* 已筹集总额 */}
          <div className="px-2 sm:px-3 py-1 sm:py-1 text-center border border-gray-600 rounded-lg min-h-[50px] sm:min-h-[55px] flex flex-col justify-center transition-transform duration-300 ease-in-out hover:scale-102 cursor-pointer">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stats.totalRaised}</div>
            <div className="text-sm sm:text-base text-gray-300 leading-tight h-8 sm:h-10 flex items-center justify-center">已筹集总额</div>
          </div>
          
          {/* 总投资人数 */}
          <div className="px-2 sm:px-3 py-1 sm:py-1 text-center border border-gray-600 rounded-lg min-h-[50px] sm:min-h-[55px] flex flex-col justify-center transition-transform duration-300 ease-in-out hover:scale-102 cursor-pointer">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1">{stats.totalInvestors}</div>
            <div className="text-sm sm:text-base text-gray-300 leading-tight h-8 sm:h-10 flex items-center justify-center">总投资人数</div>
          </div>
        </div>
      </div>
      
      {/* 项目状态统计 */}
      <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-4">
          {/* 总项目数 */}
          <div className="px-2 sm:px-3 py-1 sm:py-1 text-center border border-gray-600 rounded-lg min-h-[50px] sm:min-h-[55px] flex flex-col justify-center transition-transform duration-300 ease-in-out hover:scale-102 cursor-pointer">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-0">{stats.totalProjects}</div>
            <div className="text-xs sm:text-sm text-gray-300 leading-tight h-6 sm:h-7 flex items-center justify-center">总项目</div>
          </div>
          
          {/* 待开始项目 */}
          <div className="px-2 sm:px-3 py-1 sm:py-1 text-center border border-gray-600 rounded-lg min-h-[50px] sm:min-h-[55px] flex flex-col justify-center transition-transform duration-300 ease-in-out hover:scale-102 cursor-pointer">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-0">{stats.pendingProjects || 0}</div>
            <div className="text-xs sm:text-sm text-gray-300 leading-tight h-6 sm:h-7 flex items-center justify-center">待开始</div>
          </div>
          
          {/* 待上链项目 */}
          <div className="px-2 sm:px-3 py-1 sm:py-1 text-center border border-gray-600 rounded-lg min-h-[50px] sm:min-h-[55px] flex flex-col justify-center transition-transform duration-300 ease-in-out hover:scale-102 cursor-pointer">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-0">{stats.deployingProjects || 0}</div>
            <div className="text-xs sm:text-sm text-gray-300 leading-tight h-6 sm:h-7 flex items-center justify-center">待上链</div>
          </div>
          
          {/* 进行中项目 */}
          <div className="px-2 sm:px-3 py-1 sm:py-1 text-center border border-gray-600 rounded-lg min-h-[50px] sm:min-h-[55px] flex flex-col justify-center transition-transform duration-300 ease-in-out hover:scale-102 cursor-pointer">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-0">{stats.activeProjects || 0}</div>
            <div className="text-xs sm:text-sm text-gray-300 leading-tight h-6 sm:h-7 flex items-center justify-center">进行中</div>
          </div>
          
          {/* 成功项目 */}
          <div className="px-2 sm:px-3 py-1 sm:py-1 text-center border border-gray-600 rounded-lg min-h-[50px] sm:min-h-[55px] flex flex-col justify-center transition-transform duration-300 ease-in-out hover:scale-102 cursor-pointer">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-0">{stats.successProjects || 0}</div>
            <div className="text-xs sm:text-sm text-gray-300 leading-tight h-6 sm:h-7 flex items-center justify-center">成功</div>
          </div>
          
          {/* 失败项目 */}
          <div className="px-2 sm:px-3 py-1 sm:py-1 text-center border border-gray-600 rounded-lg min-h-[50px] sm:min-h-[55px] flex flex-col justify-center transition-transform duration-300 ease-in-out hover:scale-102 cursor-pointer">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-0">{stats.failedProjects || 0}</div>
            <div className="text-xs sm:text-sm text-gray-300 leading-tight h-6 sm:h-7 flex items-center justify-center">失败</div>
          </div>
        </div>
      </div>
    </div>
  )
}
