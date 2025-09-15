import { useQuery } from '@tanstack/react-query'
import type { Project } from '../types/project'
import { apiRequest } from '../utils/api'

// Query Keys
export const projectKeys = {
    all: ['projects'] as const,
    lists: () => [...projectKeys.all, 'list'] as const,
}

// 获取所有项目
export const useProjects = () => {
    return useQuery({
        queryKey: projectKeys.lists(),
        queryFn: async () => {
            console.log('🚀 开始请求项目数据...')
            try {
                const result = await apiRequest<{
                    success: boolean,
                    message: string,
                    data: { projects: Project[] }
                }>('/api/v1/project')
                console.log('✅ 项目数据请求成功:', result)
                return result.data.projects || [] // 提取 projects 数组
            } catch (error) {
                console.error('❌ 项目数据请求失败:', error)
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

