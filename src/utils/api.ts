// API 基础配置
export const API_BASE_URL = 'http://localhost:18888'

// 简单的 fetch 封装
export const apiRequest = async <T>(endpoint: string): Promise<T> => {
    const url = `${API_BASE_URL}${endpoint}`
    console.log('🌐 发起 API 请求:', url)

    const response = await fetch(url)
    console.log('📡 API 响应状态:', response.status, response.statusText)

    if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    console.log('📦 API 响应数据:', data)
    return data
}
