import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { NewBlogType } from '@/pages/blog-edit';
import { getBlog } from '@/services/blog';

const BlogRead: React.FC = function () {
  const [blog, setBlog] = React.useState<NewBlogType | undefined>(undefined)
  const location = useLocation()

  React.useEffect(() => {
    const blogId = location.search.slice(1).split('&')[0].split('=')[1]
    if (blogId) {
      getBlog(blogId).then((res) => {
        setBlog(res.blog[0]);
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [location.search]);

  return <div dangerouslySetInnerHTML={{ __html: blog?.content || '' }} >
  </div >
}

export default BlogRead
