import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { Project } from '../types/project'

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
export const projectKeys = {
    all: ['projects'] as const,
    lists: () => [...projectKeys.all, 'list'] as const,
    details: () => [...projectKeys.all, 'detail'] as const,
    detail: (id: string) => [...projectKeys.details(), id] as const,
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

// 获取单个项目详情
export const useProject = (projectId: string) => {
    return useQuery({
        queryKey: projectKeys.detail(projectId),
        queryFn: async () => {
            console.log('🚀 开始请求单个项目数据...', projectId)
            try {
                const result = await apiRequest<{
                    success: boolean,
                    message: string,
                    data: Project
                }>(`/api/v1/project/${projectId}`)
                console.log('✅ 单个项目数据请求成功:', result)
                return result.data // 直接返回项目数据
            } catch (error) {
                console.error('❌ 单个项目数据请求失败:', error)
                throw error
            }
        },
        enabled: !!projectId,
        staleTime: 5 * 60 * 1000,
    })
}

// 刷新单个项目
export const useRefreshProject = () => {
    const queryClient = useQueryClient()

    return (projectId: string) => {
        queryClient.invalidateQueries({ queryKey: projectKeys.detail(projectId) })
    }
}
