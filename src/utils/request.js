import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 开发环境统一走 Vite 代理
const baseURL = '/backend'

const instance = axios.create({
  baseURL,
  timeout: 10000,
})

// ==================== 请求拦截器 ====================

instance.interceptors.request.use(
  async (config) => {
    // 动态导入，避免循环依赖
    const { useUserStore } = await import('@/stores')

    const userStore = useUserStore()

    // 携带 token
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }

    return config
  },

  (err) => {
    return Promise.reject(err)
  },
)

// ==================== 响应拦截器 ====================

instance.interceptors.response.use(
  (res) => {
    // 业务成功
    if (res.data.code === 0) {
      return res
    }

    // 业务失败
    ElMessage.error(res.data.message || '服务异常')

    return Promise.reject(res.data)
  },

  async (err) => {
    // 防止没有 response 时再次报错
    ElMessage.error(err.response?.data?.message || err.message || '服务异常')

    // 401：登录状态失效
    if (err.response?.status === 401) {
      const { useUserStore } = await import('@/stores')

      const userStore = useUserStore()

      // 清除 token
      userStore.removeToken()

      // 跳转登录页
      router.push('/login')
    }

    return Promise.reject(err)
  },
)

export default instance

export { baseURL }
