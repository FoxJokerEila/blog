import * as React from 'react';
import { Card, Divider } from 'antd';
import { useLocation } from 'react-router-dom';
import User, { UserType } from '@/components/user'
import Blog, { BlogType } from '@/components/blog'

import useUser from '@/hooks/useUser';
import { getUser } from '@/services/user';




const UserBlog: React.FC = () => {
  const location = useLocation()
  const { userInfo } = useUser()
  const [isMe, setMe] = React.useState(false)
  const [curUser, setCurUser] = React.useState<UserType>({ userId: -1, username: '', email: '', description: '' })
  React.useEffect(() => {
    const urlUserId = location.search.slice(1).split('&').map((str) => {
      const [key, value] = str.split('=')
      return { key, value }
    }).find(it => it.key === 'userId')?.value
    if (urlUserId) {
      getUser(urlUserId).then((res) => {
        setCurUser(res.user[0])
      })
    }
    setMe(!Boolean(urlUserId))
  }, [userInfo, location])
  const [blogList, setBlogs] = React.useState<BlogType[]>([{
    blogId: 0,
    title: '博客标题',
    author: '红茶很好喝',
    createTime: '2023.02.11',
    like: 23,
    comment: 10
  }, {
    blogId: 1,
    title: '一个真正的man',
    author: '红茶很好喝',
    createTime: '2023.02.01',
    like: 105,
    comment: 52
  }])
  return <div>
    {isMe ? <User  {...userInfo} /> : <User {...curUser} />}

    <Divider />
    <Card title='我的博客' bordered={false} style={{ width: '100%' }}>
      {blogList.map(item => {
        return <Blog key={item.blogId} {...item} />
      })}
    </Card>


  </div>
}

export default UserBlog