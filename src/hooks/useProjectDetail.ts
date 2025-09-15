import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { Project } from '../types/project'
import { apiRequest } from '../utils/api'

// Query Keys
export const projectDetailKeys = {
    all: ['projects'] as const,
    details: () => [...projectDetailKeys.all, 'detail'] as const,
    detail: (id: string) => [...projectDetailKeys.details(), id] as const,
}

// 获取单个项目详情
export const useProjectDetail = (projectId: string) => {
    return useQuery({
        queryKey: projectDetailKeys.detail(projectId),
        queryFn: async () => {
            console.log('🚀 开始请求单个项目数据...', projectId)
            try {
                const result = await apiRequest<{
                    success: boolean,
                    message: string,
                    data: { project: Project }
                }>(`/api/v1/project/${projectId}`)
                console.log('✅ 单个项目数据请求成功:', result)
                return result.data.project // 提取 project 字段
            } catch (error) {
                console.error('❌ 单个项目数据请求失败:', error)
                throw error
            }
        },
        enabled: !!projectId,
        staleTime: 5 * 60 * 1000, // 5分钟
        retry: 1, // 只重试1次
        retryDelay: 1000, // 重试延迟1秒
        refetchOnWindowFocus: false, // 窗口聚焦时不重新获取
        refetchInterval: 30 * 1000, // 每30秒自动刷新
        refetchIntervalInBackground: true, // 后台也自动刷新
    })
}

// 刷新单个项目
export const useRefreshProject = () => {
    const queryClient = useQueryClient()

    return (projectId: string) => {
        queryClient.invalidateQueries({ queryKey: projectDetailKeys.detail(projectId) })
    }
}
