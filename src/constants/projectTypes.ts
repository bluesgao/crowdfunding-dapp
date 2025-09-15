// 项目类型常量定义
export const PROJECT_TYPES = {
    TECHNOLOGY: '科技',
    ART: '艺术',
    GAME: '游戏',
    MUSIC: '音乐',
    FILM: '影视',
    BOOK: '出版',
    FOOD: '美食',
    FASHION: '时尚',
    TRAVEL: '旅游',
    EDUCATION: '教育',
    HEALTH: '健康',
    ENVIRONMENT: '环保',
    SOCIAL: '社会',
    SPORTS: '体育',
    OTHER: '其他'
} as const

// 项目类型选项
export const PROJECT_TYPE_OPTIONS = [
    { value: '科技', label: '科技', icon: '💻', color: 'bg-blue-500' },
    { value: '艺术', label: '艺术', icon: '🎨', color: 'bg-purple-500' },
    { value: '游戏', label: '游戏', icon: '🎮', color: 'bg-green-500' },
    { value: '音乐', label: '音乐', icon: '🎵', color: 'bg-pink-500' },
    { value: '影视', label: '影视', icon: '🎬', color: 'bg-red-500' },
    { value: '出版', label: '出版', icon: '📚', color: 'bg-yellow-500' },
    { value: '美食', label: '美食', icon: '🍕', color: 'bg-orange-500' },
    { value: '时尚', label: '时尚', icon: '👗', color: 'bg-indigo-500' },
    { value: '旅游', label: '旅游', icon: '✈️', color: 'bg-cyan-500' },
    { value: '教育', label: '教育', icon: '🎓', color: 'bg-teal-500' },
    { value: '健康', label: '健康', icon: '🏥', color: 'bg-emerald-500' },
    { value: '环保', label: '环保', icon: '🌱', color: 'bg-lime-500' },
    { value: '社会', label: '社会', icon: '🤝', color: 'bg-rose-500' },
    { value: '体育', label: '体育', icon: '⚽', color: 'bg-amber-500' },
    { value: '其他', label: '其他', icon: '📦', color: 'bg-gray-500' }
] as const

// 项目类型类型定义
export type ProjectType = typeof PROJECT_TYPES[keyof typeof PROJECT_TYPES]

// 获取项目类型信息
export const getProjectTypeInfo = (category: string) => {
    return PROJECT_TYPE_OPTIONS.find(option => option.value === category) || {
        value: category,
        label: category,
        icon: '📦',
        color: 'bg-gray-500'
    }
}

// 获取项目类型颜色
export const getProjectTypeColor = (category: string) => {
    const typeInfo = getProjectTypeInfo(category)
    return typeInfo.color
}

// 获取项目类型图标
export const getProjectTypeIcon = (category: string) => {
    const typeInfo = getProjectTypeInfo(category)
    return typeInfo.icon
}
