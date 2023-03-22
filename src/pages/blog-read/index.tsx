import * as React from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs'
import { NewBlogType } from '@/pages/blog-edit';
import { getBlog, getBlogByUser, like } from '@/services/blog';
import User, { UserType } from '@/components/user';
import useSearch from '@/hooks/useSearch';
import styles from './index.module.less'
import { Badge, Button, Card, Divider, Tag } from 'antd';
import Blog, { BlogType } from '@/components/blog';
import { ClockCircleFilled, LikeFilled, LikeOutlined } from '@ant-design/icons';
import useRequest from '@/hooks/useRequest';
import useUser from '@/hooks/useUser';

const BlogRead: React.FC = function () {
  const [detail, setDetail] = React.useState<{ blog: BlogType | undefined, user: UserType, tags: { id: number, name: string }[] }>({ blog: undefined, user: { user_id: -1, username: '', email: '', description: '' }, tags: [] })
  const location = useLocation()
  const { searchFinder } = useSearch()
  const { setUserInfo } = useUser()

  React.useEffect(() => {
    const blogId = searchFinder('blog_id')
    if (blogId) {
      getBlog(blogId).then((res) => {
        setDetail({ blog: res.blog, user: res.user, tags: res.tags });
      }).catch((err) => {
        console.log(err);
      })
    }
  }, [location.search, searchFinder])

  const handleLike = () => {
    const blogId = searchFinder('blog_id')
    like(Number(blogId), true).then(res => {
      if (res?.code === 0) {
        setDetail((pre) => ({
          ...pre,
          blog: { ...res.blog },
        }))
        setUserInfo(() => res.user)
      }
    })
  }

  const handleCancelLike = () => {
    const blogId = searchFinder('blog_id')
    like(Number(blogId), false).then(res => {
      if (res?.code === 0) {
        setDetail((pre) => ({
          ...pre,
          blog: { ...res.blog },
        }))
        setUserInfo(() => res.user)
      }
    })
  }

  const handleLikeCount = (count: number = 0) => {
    if (count < 1000) {
      return count
    }
    if (count < 10000) {
      const k = (count / 1000).toFixed(0)
      return `${k}k`
    }
    const w = (count / 10000).toFixed(1)
    return `${w}w`
  }

  const { data: hotList } = useRequest<BlogType[]>(async () => {
    const res: BlogType[] = (await getBlogByUser(detail.user.user_id)).list
    return Promise.resolve(res)
  }, { deps: [detail.user.user_id] })

  return <div className={styles.box}>
    <div className={styles.content}>
      <h1 className={styles.title}>
        {detail.blog?.title}
      </h1>
      <div className={styles.time}>
        <ClockCircleFilled style={{ color: 'rgba( 0, 0, 0, 0.25)', marginRight: 5 }} />{dayjs.utc(detail.blog?.create_time).local().format('YYYY-MM-DD HH:mm:ss')}
      </div>
      <div className={styles.tags}>
        标签：{detail.tags?.map((item) => {
          return <Tag key={item.id} color="default">{item.name}</Tag>
        })}
      </div>

      <Divider />
      <div>
        <div dangerouslySetInnerHTML={{ __html: detail?.blog?.content || '' }} >
        </div >
      </div>

    </div>
    <div className={styles.right}>
      <User {...detail?.user} />
      <Card title="热门文章" extra={<Button type="link" onClick={() => window.open(`${window.location.origin}/user-blog?user_id=${detail.user.user_id}`)}>更多</Button>} style={{ width: 300, marginTop: 12 }} bodyStyle={{ paddingTop: 12 }}>
        {hotList?.slice(0, 5).map((item: BlogType) => {
          return <Blog type="mini" blog_id={item.blog_id} title={item.title}></Blog>
        })}
      </Card>

      <div className={styles.likeCon}>
        <Badge count={handleLikeCount(detail.blog?.like)} overflowCount={999999} color="#595959" offset={[0, -5]}>
          <div className={styles.like}>
            {detail.blog?.is_liked ? <LikeFilled onClick={handleCancelLike} /> : <LikeOutlined onClick={handleLike} />}
          </div>

        </Badge>
      </div>
    </div>

  </div>

}

export default BlogRead
