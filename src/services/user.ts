import { get, post } from './request'

export const login = (formdata: any) => {
  return post('/user/login', formdata)
}

export const getUser = (userId: string) => {
  return get('/user/user-info', { userId: userId })
}
