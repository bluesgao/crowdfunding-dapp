import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CrowdfundingCard from '../components/CrowdfundingCard'
import SearchAndFilter from '../components/SearchAndFilter'
import HeroSection from '../components/HeroSection'
import { CrowdfundingProject, ProjectStats } from '../types/crowdfunding'
import { crowdfundingContract } from '../utils/crowdfundingContract'

export default function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [projects, setProjects] = useState<CrowdfundingProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<CrowdfundingProject[]>([])
  const [stats, setStats] = useState<ProjectStats | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // 加载数据
  useEffect(() => {
    loadData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 搜索和过滤
  useEffect(() => {
    const filtered = projects
      .filter(project => {
        // 搜索过滤
        if (searchTerm) {
          const searchLower = searchTerm.toLowerCase()
          return project.title.toLowerCase().includes(searchLower) ||
                 project.description.toLowerCase().includes(searchLower) ||
                 project.tags.some(tag => tag.toLowerCase().includes(searchLower))
        }
        return true
      })
      .filter(project => {
        // 分类过滤
        return categoryFilter === 'all' || project.tags.includes(categoryFilter)
      })
      .sort((a, b) => b.startTime - a.startTime) // 按最新时间排序

    setFilteredProjects(filtered)
  }, [projects, searchTerm, categoryFilter])

  const loadData = async () => {
    try {
      const [allProjects, projectStats] = await Promise.all([
        crowdfundingContract.getAllProjects(),
        crowdfundingContract.getStats()
      ])
      setProjects(allProjects)
      setStats(projectStats)
    } catch {
      alert(t('errors.loadDataFailed'))
    }
  }

  const handleViewProject = (project: CrowdfundingProject) => {
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
        <div className="mb-8 sm:mb-10">
          <HeroSection stats={stats} />
        </div>

        {/* 搜索和过滤栏 */}
        <div className="mb-8 sm:mb-10">
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            categoryFilter={categoryFilter}
            setCategoryFilter={setCategoryFilter}
          />
        </div>

        {/* 项目网格 */}
        <div className="mb-8 sm:mb-10">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-2xl font-semibold text-gray-400 mb-3">{t('project.noProjects')}</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm ? t('project.noProjectsFound') : t('project.noProjectsDescription')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {filteredProjects.map((project) => (
                <CrowdfundingCard
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
