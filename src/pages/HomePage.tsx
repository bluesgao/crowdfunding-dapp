import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import HeroSection from '../components/HeroSection'
import ProjectStats from '../components/ProjectStats'
import { Project } from '../types/project'
import { useProjects, useProjectStats } from '../hooks'

export default function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // 使用 react-query hooks
  const { data: projects = [], isLoading: projectsLoading, error: projectsError } = useProjects()
  const { data: stats, isLoading: statsLoading, error: statsError } = useProjectStats()
  
  // 调试信息
  console.log('🏠 HomePage - projects:', projects)
  console.log('🏠 HomePage - stats:', stats)
  console.log('🏠 HomePage - statsLoading:', statsLoading)
  console.log('🏠 HomePage - statsError:', statsError)

  // 项目排序逻辑 - 确保 projects 是数组
  const sortedProjects = Array.isArray(projects) 
    ? projects.sort((a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()) 
    : [] // 按最新时间排序


  const handleViewProject = (project: Project) => {
    navigate(`/project/${project.id}`, { 
      state: { from: 'homepage' } 
    })
  }



  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* 简化背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
        {/* 头部 */}
        <div className="mb-4 sm:mb-6">
          <HeroSection />
        </div>

        {/* 统计数据 */}
        <div className="mb-8 sm:mb-10">
          <ProjectStats stats={stats || null} />
        </div>


        {/* 项目网格 */}
        <div className="mt-12 sm:mt-16 mb-8 sm:mb-10">
          {projectsLoading ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">⏳</div>
              <h3 className="text-2xl font-semibold text-gray-400 mb-3">加载中...</h3>
              <p className="text-gray-500">正在获取项目数据</p>
            </div>
          ) : projectsError ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">❌</div>
              <h3 className="text-2xl font-semibold text-red-400 mb-3">加载失败</h3>
              <p className="text-gray-500">无法获取项目数据，请稍后重试</p>
            </div>
          ) : sortedProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-2xl font-semibold text-gray-400 mb-3">{t('project.noProjects')}</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {t('project.noProjectsDescription')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {sortedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onView={handleViewProject}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
