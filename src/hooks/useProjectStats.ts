import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { ProjectStats } from '../types/project'

// API 基础配置
const API_BASE_URL = 'http://localhost:18888'

// 简单的 fetch 封装
const apiRequest = async <T>(endpoint: string): Promise<T> => {
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

// Query Keys
export const statsKeys = {
    all: ['stats'] as const,
    stats: () => [...statsKeys.all, 'project'] as const,
}

// 获取项目统计数据
export const useProjectStats = () => {
    console.log('🔧 useProjectStats hook 被调用')
    return useQuery({
        queryKey: statsKeys.stats(),
        queryFn: async () => {
            console.log('🚀 开始请求统计数据...')
            try {
                const result = await apiRequest<{
                    success: boolean,
                    message: string,
                    data: { stats: ProjectStats }
                }>('/api/v1/project/stats')
                console.log('✅ 统计数据请求成功:', result)
                return result.data.stats || null // 提取 stats 字段
            } catch (error) {
                console.error('❌ 统计数据请求失败:', error)
                throw error
            }
        },
        staleTime: 60 * 1000, // 1分钟
        retry: 1, // 只重试1次
        retryDelay: 1000, // 重试延迟1秒
        refetchOnWindowFocus: false, // 窗口聚焦时不重新获取
        refetchInterval: 30 * 1000, // 每30秒自动刷新
        refetchIntervalInBackground: true, // 后台也自动刷新
        // 移除 initialData，让 React Query 正常发起请求
    })
}

// 刷新统计数据
export const useRefreshStats = () => {
    const queryClient = useQueryClient()

    return () => {
        queryClient.invalidateQueries({ queryKey: statsKeys.stats() })
    }
}
