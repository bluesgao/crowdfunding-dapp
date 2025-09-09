// Header.tsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import LanguageSwitcher from './LanguageSwitcher'

export default function Header() {
  const { t } = useTranslation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-40 h-16 sm:h-20">
      <header className="bg-gray-900 border-b border-gray-700 relative h-full">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          {/* Logo 和标题 */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-white">
                {t('header.title')}
              </h1>
            </div>
          </div>

          {/* 桌面端右侧操作区 */}
          <div className="hidden sm:flex items-center space-x-3">
            {/* 语言切换 */}
            <LanguageSwitcher />
            
            {/* 钱包连接 */}
            <div className="flex-shrink-0">
              <ConnectButton />
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="sm:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg hover:bg-gray-700 transition-colors relative"
              aria-label={mobileMenuOpen ? t('header.closeMenu') : t('header.openMenu')}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block h-0.5 w-6 bg-white ${mobileMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'}`}></span>
                <span className={`block h-0.5 w-6 bg-white ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block h-0.5 w-6 bg-white ${mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* 移动端菜单 */}
        <div className={`mobile-menu sm:hidden absolute top-16 sm:top-20 left-0 right-0 bg-gray-900 border-b border-gray-700 shadow-lg ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <div className="px-6 py-6 space-y-6">
            {/* 语言切换 */}
            <div className="group">
              <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-xl">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base">{t('header.language')}</h3>
                </div>
                <div className="flex-shrink-0">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
            
            {/* 钱包连接 */}
            <div className="group">
              <div className="p-4 bg-gray-800 rounded-xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white font-semibold text-base">{t('header.wallet')}</h3>
                  </div>
                </div>
                <div className="w-full">
                  <ConnectButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </header>
    </div>
  )
}