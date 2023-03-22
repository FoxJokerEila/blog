import * as React from 'react';
import { Button, Card, Divider, Input, Tooltip } from 'antd';
import { useLocation } from 'react-router-dom';
import User, { UserType } from '@/components/user'
import Blog, { BlogType } from '@/components/blog'

import useUser from '@/hooks/useUser';
import { getUser } from '@/services/user';

import styles from './index.module.less'
import { addTag, getBlogByUser, getTags } from '@/services/blog';
import CustomEmpty from '@/components/common/empty';
import useSearch from '@/hooks/useSearch';
import { QuestionCircleOutlined } from '@ant-design/icons';




const UserBlog: React.FC = () => {
  const location = useLocation()
  const { searchFinder } = useSearch()
  const { userInfo } = useUser()
  const [state, setState] = React.useState<{
    user: UserType,
    blogs: BlogType[]
  }>({
    user: { user_id: -1, username: '', email: '', description: '' },
    blogs: []
  })
  const [isMe, setIsMe] = React.useState<boolean>(false)


  const fetchBlog = () => {
    const userId = searchFinder('user_id') || userInfo.user_id
    getBlogByUser(userId).then((res) => {
      console.log(res);
      setState({ user: userInfo, blogs: res?.list })
    })
  }

  React.useEffect(() => {
    const urlUserId = searchFinder('user_id')

    if (urlUserId) {
      Promise.all([getUser(Number(urlUserId)), getBlogByUser(Number(urlUserId))]).then((res) => {
        setState({
          user: res[0]?.user,
          blogs: res[1]?.list
        })
      })
    } else {
      getBlogByUser(userInfo.user_id).then((res) => {
        console.log(res);
        setState({ user: userInfo, blogs: res?.list })
      })
    }
  }, [userInfo, location, searchFinder])

  React.useEffect(() => {
    if (state.user.user_id === -1) return

    setIsMe(() => {
      console.log(121);
      return (state.user && state.user.user_id === userInfo.user_id)
    })

  }, [state, userInfo.user_id])

  const [value, setValue] = React.useState('')
  return <div className={styles.box}>
    <User {...state.user} isMe={isMe} />
    <Input value={value} onChange={(e) => {
      setValue(e.target.value)
    }}></Input>
    <Button onClick={() => addTag(value)}>添加</Button>
    <Button onClick={() => getTags()}>拉取</Button>
    <Divider style={{ margin: '12px 0' }} />
    <div className={styles.content}>
      <Card title={state.user && state.user.user_id === userInfo.user_id ? '我的博客' : '博客列表'} bordered={false} style={{ width: '100%' }}>
        {state?.blogs ? state.blogs.map(item => {
          return <Blog key={item.blog_id} {...item} isMe={isMe} refetch={fetchBlog} />
        }) : <CustomEmpty />}
      </Card>
      <Card title={<div>博客气泡 <Tooltip title="当您的博客被推荐给其他用户时，会以如下形式展示。"><QuestionCircleOutlined /></Tooltip></div>} className={styles.rightCard}>

      </Card>
    </div>



  </div>
}

export default UserBlog