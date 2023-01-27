import axios, { AxiosRequestConfig } from 'axios'

const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
})

export const get = function (url: string, config?: AxiosRequestConfig<any>) {
  return instance.get(url, config)
}

export const post = function (
  url: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) {
  return instance.post(url, data, config)
}
