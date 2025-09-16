import { useTranslation } from 'react-i18next'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <div className="relative mb-2 sm:mb-2">
      {/* 内容区域 */}
      <div className="relative text-center py-4 sm:py-4">
        {/* Slogan */}
        <div className="relative">
          {/* 主文字 */}
          <p className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 max-w-5xl mx-auto leading-relaxed font-bold tracking-wide drop-shadow-2xl">
            {t('header.slogan')}
          </p>
          
          {/* 发光效果 */}
          <p className="absolute inset-0 text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 max-w-5xl mx-auto leading-relaxed font-bold tracking-wide blur-sm opacity-50">
            {t('header.slogan')}
          </p>
        </div>
      </div>
    </div>
  )
}
