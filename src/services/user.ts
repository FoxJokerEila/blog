import { get, post } from './request'

export const login = (formdata: any) => {
  return post('/user/login', formdata)
}

export const getUser = (user_id: number) => {
  return get('/user/user-info', { user_id })
}

export const updateUser = (
  user_id: number,
  username: string,
  email: string,
  description: string
) => {
  return post('/user/update', { user_id, username, email, description })
}
