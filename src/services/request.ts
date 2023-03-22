import alertNotification from '@/components/common/notification'
import alertMessage from '@/components/common/message'
import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  timeout: 3000,
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
})

export const get = async function (
  url: string,
  params?: any,
  config?: AxiosRequestConfig<any>
) {
  try {
    const { data } = await instance.get(url, { ...config, params })
    if (data?.code === 0 && data?.msg) {
      alertMessage({
        msg: data.msg
      })
    }
    return await Promise.resolve(data)
  } catch (err: any) {
    console.log(err)
    if (err?.response?.status === 401) {
      alertNotification('提示', '请登录')
      // setTimeout(() => {
      //   localStorage.clear()
      //   window.location.href = '/login'
      //   return
      // }, 1500)
    }
  }
}

export const post = async function (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) {
  try {
    const { data: resData } = await instance.post(url, data, config)
    if (resData?.code === 0 && resData?.msg) {
      alertMessage({
        msg: resData.msg
      })
    }
    return await Promise.resolve(resData)
  } catch (err: any) {
    console.log(err)

    if (err?.response?.status === 401) {
      alertNotification('提示', '请登录')
      // setTimeout(() => {
      //   localStorage.clear()
      //   window.location.href = '/login'
      //   return
      // }, 1500)
    }
  }
}
