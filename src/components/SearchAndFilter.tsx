// SearchAndFilter.tsx
import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'

interface SearchAndFilterProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  categoryFilter: string
  setCategoryFilter: (category: string) => void
}

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter
}: SearchAndFilterProps) {
  const { t } = useTranslation()
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // 添加鼠标滚轮水平滚动支持
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleWheel = (e: WheelEvent) => {
      // 检查容器是否可以水平滚动
      const canScrollHorizontally = container.scrollWidth > container.clientWidth
      
      if (canScrollHorizontally) {
        // 如果按住Shift键，则水平滚动
        if (e.shiftKey) {
          e.preventDefault()
          container.scrollLeft += e.deltaY
          return
        }
        
        // 如果有水平滚动输入，则水平滚动
        if (Math.abs(e.deltaX) > 0) {
          e.preventDefault()
          container.scrollLeft += e.deltaX
          return
        }
        
        // 如果垂直滚动量大于水平滚动量，且容器可以水平滚动，则转换为水平滚动
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && e.deltaY !== 0) {
          e.preventDefault()
          container.scrollLeft += e.deltaY
        }
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [])

  // 热门标签
  const popularTags = [
    { key: 'tech', label: t('search.categories.tech') },
    { key: 'environment', label: t('search.categories.environment') },
    { key: 'game', label: t('search.categories.game') },
    { key: 'art', label: t('search.categories.art') },
    { key: 'education', label: t('search.categories.education') },
    { key: 'health', label: t('search.categories.health') },
    { key: 'finance', label: t('search.categories.finance') },
    { key: 'music', label: t('search.categories.music') },
    { key: 'sports', label: t('search.categories.sports') },
    { key: 'food', label: t('search.categories.food') },
    { key: 'travel', label: t('search.categories.travel') },
    { key: 'fashion', label: t('search.categories.fashion') },
    { key: 'ai', label: t('search.categories.ai') },
    { key: 'blockchain', label: t('search.categories.blockchain') },
    { key: 'nft', label: t('search.categories.nft') },
    { key: 'startup', label: t('search.categories.startup') },
    { key: 'social', label: t('search.categories.social') },
    { key: 'charity', label: t('search.categories.charity') },
    { key: 'innovation', label: t('search.categories.innovation') },
    { key: 'sustainability', label: t('search.categories.sustainability') },
    { key: 'community', label: t('search.categories.community') },
    { key: 'culture', label: t('search.categories.culture') },
    { key: 'entertainment', label: t('search.categories.entertainment') },
    { key: 'lifestyle', label: t('search.categories.lifestyle') },
    { key: 'wellness', label: t('search.categories.wellness') },
    { key: 'productivity', label: t('search.categories.productivity') },
    { key: 'security', label: t('search.categories.security') },
    { key: 'privacy', label: t('search.categories.privacy') },
    { key: 'accessibility', label: t('search.categories.accessibility') },
    { key: 'inclusion', label: t('search.categories.inclusion') }
  ]

  return (
    <div className="relative mb-8 sm:mb-10">
      {/* 背景容器 */}
      <div className="absolute inset-0 bg-gray-900 rounded-2xl border border-gray-700"></div>
      
      <div className="relative p-6 sm:p-8">
        {/* 搜索框区域 */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder={t('search.placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-gray-800 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base text-white placeholder-gray-300"
            />
            
            {/* 搜索图标 */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            {/* 清除按钮 */}
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1.5 rounded-full hover:bg-white/20 transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* 热门标签区域 */}
        <div className="flex items-center gap-3">
          {/* 可滚动的标签容器 */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-x-auto overflow-y-hidden"
            style={{ 
              minWidth: 0,
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <div className="flex items-center gap-2" style={{ width: 'max-content' }}>
              {popularTags.map((tag) => (
                <button
                  key={tag.key}
                  onClick={() => setCategoryFilter(tag.key)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap flex-shrink-0 ${
                    categoryFilter === tag.key
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/10'
                  }`}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>

          {/* 清除筛选按钮 */}
          <button
            onClick={() => {
              setCategoryFilter('all')
              setSearchTerm('')
            }}
            className="flex-shrink-0 px-4 py-1.5 rounded-full bg-gray-800 border border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white flex items-center justify-center"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}