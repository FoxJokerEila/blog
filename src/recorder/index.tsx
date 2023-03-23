import { clickBlog, viewBlog } from '@/services/blog';

export type RecordType = 'click' | 'view'

const record = (type: RecordType, rest: { user_id?: number, blog_id?: number }) => {
  const { user_id, blog_id } = rest
  if (user_id && blog_id) {
    switch (type) {
      case 'click':
        return clickBlog(user_id, blog_id);
      case 'view':
        return viewBlog(user_id, blog_id);
      default:
        break;
    }
  }

}

export default record
