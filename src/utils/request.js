import axios from 'axios'
import {Toast} from 'vant'

const service = axios.create({
    baseURL: 'https://mockapi.eolinker.com/yAhaMgA53e135452bad0a2f1c93fdec629103389d418fd9/api',
    withCredentials: true,
    timeout: 50000
})

/** 请求拦截器 */
service.interceptors.request.use(
    config => {
        if (config.method.toUpperCase() === 'GET') {
            // 添加随机code 避免请求缓存
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

/** 响应拦截器 */
service.interceptors.response.use(
    response => {
        if (response.data.code != undefined) {
            if (response.data.code !== 0) {
                Toast.fail('请求失败')
                return Promise.reject(response.data.msg || 'error')
            } else {
                return response.data
            }
        } else {
            return response.data
        }
    }
)
export default service