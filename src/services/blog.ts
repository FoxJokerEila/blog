import { NewBlogType } from '@/pages/blog-edit'
import { get, post } from './request'

export const getBlog = (blog_id: number) => {
  return get('/blog/get', { blog_id })
}

export const getBlogByUser = (user_id: number) => {
  if (user_id < 0) {
    return Promise.resolve(null)
  }
  return get('/blog/get-by-user', { user_id })
}

export const postBlog = (blog: NewBlogType) => {
  return post('/blog/post', { blog })
}

export const updateBlog = (blog: NewBlogType) => {
  return post('/blog/update', { blog })
}

export const deleteBlog = (blog_id: number) => {
  return post('/blog/delete', { blog_id })
}

export const upload = (formData: any) => {
  console.log(formData.entries(), 1)

  return post('/upload/img', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const clickBlog = (user_id: number, blog_id: number) => {
  return post('/blog/click', {
    user_id,
    blog_id,
    create_time: new Date().getTime(),
    type: 'click'
  })
}

export const viewBlog = (user_id: number, blog_id: number) => {
  return post('/blog/view', {
    user_id,
    blog_id,
    create_time: new Date().getTime(),
    type: 'view'
  })
}

export const addTag = (name: string) => {
  return post('/blog/add-tag', { name })
}

export const getTags = () => {
  return get('/blog/tags')
}

export const like = (blog_id: number, like: boolean) => {
  return post('/blog/like', { blog_id, like })
}

export const recommend = (page: number, size: number) => {
  return get('/blog/recommend', { page, size })
}
