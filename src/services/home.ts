import { get } from './request'

export const getHotBlog = (page: number) => {
  return get('get-hot-blog', { params: { page: page } })
}
