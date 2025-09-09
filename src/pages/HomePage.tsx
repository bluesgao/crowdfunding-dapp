import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAccount } from 'wagmi'
import { useNavigate } from 'react-router-dom'
import CrowdfundingCard from '../components/CrowdfundingCard'
import InvestModal from '../components/InvestModal'
import SearchAndFilter from '../components/SearchAndFilter'
import HeroSection from '../components/HeroSection'
import { CrowdfundingProject, ProjectStats } from '../types/crowdfunding'
import { crowdfundingContract } from '../utils/crowdfundingContract'

export default function HomePage() {
  const { t } = useTranslation()
  const { address, isConnected } = useAccount()
  const navigate = useNavigate()
  const [projects, setProjects] = useState<CrowdfundingProject[]>([])
  const [filteredProjects, setFilteredProjects] = useState<CrowdfundingProject[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<ProjectStats | null>(null)
  const [selectedProject, setSelectedProject] = useState<CrowdfundingProject | null>(null)
  const [investModalVisible, setInvestModalVisible] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')

  // 加载数据
  useEffect(() => {
    loadData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // 搜索和过滤
  useEffect(() => {
    let filtered = projects

    // 搜索过滤
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    // 分类过滤
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(project => project.tags.includes(categoryFilter))
    }

    // 按最新时间排序
    filtered.sort((a, b) => b.startTime - a.startTime)

    setFilteredProjects(filtered)
  }, [projects, searchTerm, categoryFilter])

  const loadData = async () => {
    setLoading(true)
    try {
      const [allProjects, projectStats] = await Promise.all([
        crowdfundingContract.getAllProjects(),
        crowdfundingContract.getStats()
      ])
      setProjects(allProjects)
      setStats(projectStats)
    } catch {
      alert(t('errors.loadDataFailed'))
    } finally {
      setLoading(false)
    }
  }

  const handleViewProject = (project: CrowdfundingProject) => {
    navigate(`/project/${project.id}`, { 
      state: { from: 'homepage' } 
    })
  }

  const handleInvestProject = (project: CrowdfundingProject) => {
    setSelectedProject(project)
    setInvestModalVisible(true)
  }


  const handleInvest = async (project: CrowdfundingProject, amount: string) => {
    if (!address) {
      alert(t('wallet.pleaseConnect'))
      return
    }

    const success = await crowdfundingContract.investInProject(project.id, amount, address)
    if (success) {
      await loadData() // 重新加载数据
    } else {
      throw new Error(t('investment.investmentFailed'))
    }
  }


  return (
    <div className="min-h-screen relative">
      {/* 全局背景系统 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-purple-600/12 to-pink-600/8"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/6 via-blue-500/8 to-purple-500/6 blur-3xl"></div>
      
      {/* 全局浮动光球 */}
      <div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-purple-500/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      <div className="absolute top-1/2 -left-8 w-24 h-24 bg-pink-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
      <div className="absolute top-1/4 -right-8 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      
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
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-300">{t('common.loading')}</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-6">🚀</div>
              <h3 className="text-2xl font-semibold text-gray-400 mb-3">{t('project.noProjects')}</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm ? t('project.noProjectsFound') : t('project.noProjectsDescription')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProjects.map((project) => (
                <CrowdfundingCard
                  key={project.id}
                  project={project}
                  onView={handleViewProject}
                  onInvest={handleInvestProject}
                  showInvestButton={isConnected}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 投资模态框 */}
      <InvestModal
        project={selectedProject}
        visible={investModalVisible}
        onClose={() => setInvestModalVisible(false)}
        onInvest={handleInvest}
      />
    </div>
  )
}
