import { clickBlog, viewBlog } from '@/services/blog';

export type RecordType = 'click' | 'view'

const record = (type: RecordType, ...rest: any[]) => {
  const [user_id, blog_id] = rest
  switch (type) {
    case 'click':
      return clickBlog(user_id, blog_id);
    case 'view':
      return viewBlog(user_id, blog_id);
    default:
      break;
  }
}

export default record
