import { PrivacyType } from '@/components/user'
import { get, post } from './request'

export const login = (formdata: any) => {
  return post('/user/login', formdata)
}

export const register = (formdata: any) => {
  return post('/user/register', formdata)
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

export const follow = (user_id: number) => {
  return post('/user/follow', { user_id })
}

export const unfollow = (user_id: number) => {
  return post('/user/unfollow', { user_id })
}

export const getFollowing = (user_id: number) => {
  return get('/user/getFollowing', { user_id })
}

export const getFans = (user_id: number) => {
  return get('/user/getFans', { user_id })
}

export const getFollowFan = (user_id: number) => {
  return get('/user/getFollowFan', { user_id })
}

export const updatePrivacy = (privacy: PrivacyType) => {
  return post('/user/updatePrivacy', { privacy })
}

export const refetchUser = () => {
  return get('/user/refetchUser')
}
