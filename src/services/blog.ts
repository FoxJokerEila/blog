import { get, post } from './request'

export const getBlog = (blogId: string) => {
  return get('get-blog', { params: { blogId: blogId } })
}

export const postBlog = (content: string) => {
  return post('post-blog', { content: content })
}

export const updateBlog = (blogId: string, content: string) => {
  return post('update-blog', { blogId: blogId, content: content })
}

export const deleteBlog = (blogId: string) => {
  return post('delete-blog', { blogId: blogId })
}
