import alertNotification from '@/components/common/notification'
import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  timeout: 1000,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const get = async function (
  url: string,
  params: any,
  config?: AxiosRequestConfig<any>
) {
  try {
    const res = await instance.get(url, { ...config, params })
    return await Promise.resolve(res.data)
  } catch (err: any) {
    if (err?.response.status === 401) {
      alertNotification('提示', '请登录')
      setTimeout(() => {
        localStorage.clear()
        window.location.href = '/login'
        return
      }, 1500)
    }
  }
}

export const post = async function (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) {
  try {
    console.log(data)

    const res = await instance.post(url, data, config)
    return await Promise.resolve(res)
  } catch (err: any) {
    if (err?.response.status === 401) {
      alertNotification('提示', '请登录')
      // setTimeout(() => {
      //   localStorage.clear()
      //   window.location.href = '/login'
      //   return
      // }, 1500)
    }
  }
}
