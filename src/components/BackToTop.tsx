import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export default function BackToTop() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)

  // 监听滚动事件
  useEffect(() => {
    const scrollContainer = document.querySelector('.scroll-container')
    
    const toggleVisibility = () => {
      const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.pageYOffset
      setIsVisible(scrollTop > 300)
    }

    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', toggleVisibility)
      return () => scrollContainer.removeEventListener('scroll', toggleVisibility)
    } else {
      window.addEventListener('scroll', toggleVisibility)
      return () => window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // 回到顶部
  const scrollToTop = () => {
    const scrollContainer = document.querySelector('.scroll-container')
    const scrollOptions = { top: 0, behavior: 'smooth' as const }
    
    if (scrollContainer) {
      scrollContainer.scrollTo(scrollOptions)
    } else {
      window.scrollTo(scrollOptions)
    }
  }

  if (!isVisible) {
    return null
  }

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-4 sm:bottom-8 sm:right-4 z-50 p-3 bg-gray-800/80 backdrop-blur-sm hover:bg-gray-700/80 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group border border-gray-600/50"
      aria-label={t('common.backToTop')}
    >
      <svg 
        className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  )
}
