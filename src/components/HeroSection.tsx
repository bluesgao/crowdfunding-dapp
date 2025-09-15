import { useTranslation } from 'react-i18next'

interface HeroSectionProps {
  // 移除 stats 参数，因为统计数据已经拆分到独立组件
}

export default function HeroSection({}: HeroSectionProps) {
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
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              {t('header.subtitle')}
            </p>
      </div>
    </div>
  )
}
