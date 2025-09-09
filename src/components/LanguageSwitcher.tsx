// LanguageSwitcher.tsx
import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  const toggleLanguage = () => {
    const currentLang = i18n.language
    const newLang = currentLang === 'zh-CN' ? 'en-US' : 'zh-CN'
    i18n.changeLanguage(newLang)
  }

  const getCurrentLanguageDisplay = () => {
    return i18n.language === 'zh-CN' ? t('language.chinese') : t('language.english')
  }

  const getTooltipText = () => {
    return i18n.language === 'zh-CN' ? t('language.switchToEnglish') : t('language.switchToChinese')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 text-sm font-medium rounded bg-gray-700 text-gray-200 hover:bg-gray-600 hover:text-white w-16"
      title={getTooltipText()}
    >
      {getCurrentLanguageDisplay()}
    </button>
  )
}
