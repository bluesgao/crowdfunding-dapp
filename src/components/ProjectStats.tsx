import type { ProjectStats as ProjectStatsType } from '../types/project'

interface ProjectStatsProps {
  stats: ProjectStatsType | null
}

export default function ProjectStats({ stats }: ProjectStatsProps) {
  // 默认统计数据
  const defaultStats = {
    totalRaised: '0.0000',
    totalInvestors: 0,
    totalProjects: 0,
    pendingProjects: 0,
    deployingProjects: 0,
    activeProjects: 0,
    successProjects: 0,
    failedProjects: 0
  }

  // 使用传入的stats或默认值
  const displayStats = stats || defaultStats

  return (
    <div className="mb-6 sm:mb-8 space-y-6">
      {/* 核心统计数据 - 突出显示 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mx-4 sm:mx-8 lg:mx-12">
        {/* 已筹集总额 */}
        <div className="bg-gray-800/50 rounded-xl p-6 sm:p-8 lg:p-10">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3">
              {displayStats.totalRaised}
            </div>
            <div className="flex items-center justify-center">
              <div className="text-blue-400 text-xl sm:text-2xl font-bold">已筹集总额 (ETH)</div>
            </div>
          </div>
        </div>
        
        {/* 总投资人数 */}
        <div className="bg-gray-800/50 rounded-xl p-6 sm:p-8 lg:p-10">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3">
              {displayStats.totalInvestors.toLocaleString()}
            </div>
            <div className="flex items-center justify-center">
              <div className="text-green-400 text-xl sm:text-2xl font-bold">总投资人数 (人)</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 项目状态统计 - 网格布局 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
        {/* 总项目数 */}
        <div className="bg-gray-800/50 rounded-lg p-4 sm:p-5 lg:p-6">
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-2">
              {displayStats.totalProjects}
            </div>
            <div className="text-sm sm:text-base text-blue-400 font-bold">总项目</div>
          </div>
        </div>
        
        {/* 待开始项目 */}
        <div className="bg-gray-800/50 rounded-lg p-4 sm:p-5 lg:p-6">
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-yellow-400 mb-2">
              {displayStats.pendingProjects}
            </div>
            <div className="text-sm sm:text-base text-yellow-400 font-bold">待开始</div>
          </div>
        </div>
        
        {/* 待上链项目 */}
        <div className="bg-gray-800/50 rounded-lg p-4 sm:p-5 lg:p-6">
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-orange-400 mb-2">
              {displayStats.deployingProjects}
            </div>
            <div className="text-sm sm:text-base text-orange-400 font-bold">待上链</div>
          </div>
        </div>
        
        {/* 进行中项目 */}
        <div className="bg-gray-800/50 rounded-lg p-4 sm:p-5 lg:p-6">
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-400 mb-2">
              {displayStats.activeProjects}
            </div>
            <div className="text-sm sm:text-base text-blue-400 font-bold">进行中</div>
          </div>
        </div>
        
        {/* 成功项目 */}
        <div className="bg-gray-800/50 rounded-lg p-4 sm:p-5 lg:p-6">
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-400 mb-2">
              {displayStats.successProjects}
            </div>
            <div className="text-sm sm:text-base text-green-400 font-bold">成功</div>
          </div>
        </div>
        
        {/* 失败项目 */}
        <div className="bg-gray-800/50 rounded-lg p-4 sm:p-5 lg:p-6">
          <div className="text-center">
            <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-400 mb-2">
              {displayStats.failedProjects}
            </div>
            <div className="text-sm sm:text-base text-red-400 font-bold">失败</div>
          </div>
        </div>
      </div>
    </div>
  )
}
