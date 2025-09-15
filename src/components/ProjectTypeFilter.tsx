import { useState } from 'react'
import { PROJECT_TYPE_OPTIONS } from '../constants/projectTypes'

interface ProjectTypeFilterProps {
  selectedType: string | null
  onTypeChange: (type: string | null) => void
}

export default function ProjectTypeFilter({ selectedType, onTypeChange }: ProjectTypeFilterProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleTypeSelect = (type: string) => {
    if (selectedType === type) {
      onTypeChange(null) // 取消选择
    } else {
      onTypeChange(type) // 选择新类型
    }
    setIsOpen(false)
  }

  const selectedTypeInfo = selectedType 
    ? PROJECT_TYPE_OPTIONS.find(option => option.value === selectedType)
    : null

  return (
    <div className="relative">
      {/* 筛选按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg border border-gray-600 transition-colors"
      >
        {selectedTypeInfo ? (
          <>
            <span className="text-lg">{selectedTypeInfo.icon}</span>
            <span className="text-sm font-medium">{selectedTypeInfo.label}</span>
          </>
        ) : (
          <>
            <span className="text-lg">📂</span>
            <span className="text-sm font-medium">所有类型</span>
          </>
        )}
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {/* 全部选项 */}
          <button
            onClick={() => handleTypeSelect('')}
            className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
              !selectedType ? 'bg-gray-700' : ''
            }`}
          >
            <span className="text-lg">📂</span>
            <span className="text-sm font-medium text-white">所有类型</span>
          </button>

          {/* 分割线 */}
          <div className="border-t border-gray-600"></div>

          {/* 类型选项 */}
          {PROJECT_TYPE_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleTypeSelect(option.value)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-700 transition-colors ${
                selectedType === option.value ? 'bg-gray-700' : ''
              }`}
            >
              <span className="text-lg">{option.icon}</span>
              <span className="text-sm font-medium text-white">{option.label}</span>
              {selectedType === option.value && (
                <svg className="w-4 h-4 ml-auto text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 点击外部关闭 */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
