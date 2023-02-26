import { NewBlogType } from '@/pages/blog-edit'
import { get, post } from './request'

export const getBlog = (blogId: string) => {
  return get('/blog/get', { blogId: blogId })
}

export const postBlog = (blog: NewBlogType) => {
  return post('/blog/post', { blog })
}

export const updateBlog = (blogId: string, content: string) => {
  return post('update-blog', { blogId: blogId, content: content })
}

export const deleteBlog = (blogId: string) => {
  return post('delete-blog', { blogId: blogId })
}

export const upload = (formData: any) => {
  console.log(formData.entries(), 1)

  return post('/blog/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
