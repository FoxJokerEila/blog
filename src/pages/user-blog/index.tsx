import * as React from 'react';
import { Button, Card, Divider, Input, Pagination, Tooltip } from 'antd';
import { useLocation } from 'react-router-dom';
import User, { UserType } from '@/components/user'
import Blog, { BlogType } from '@/components/blog'
import Bubble from '@/components/bubble';
import useUser from '@/hooks/useUser';
import { getUser } from '@/services/user';

import styles from './index.module.less'
import { getBlogByUser } from '@/services/blog';
import CustomEmpty from '@/components/common/empty';
import useSearch from '@/hooks/useSearch';
import { QuestionCircleOutlined } from '@ant-design/icons';

const UserBlog: React.FC = () => {
  const location = useLocation()
  const { searchFinder } = useSearch()
  const { userInfo } = useUser()
  const [current, setCuerrent] = React.useState<number>(1)
  const [state, setState] = React.useState<{
    user: UserType,
    blogs: BlogType[],
    total: number
  }>({
    user: { user_id: -1, username: '', email: '', description: '', is_me: false, privacy: {} },
    blogs: [],
    total: 0
  })

  const fetchBlog = (page: number) => {
    setCuerrent(page)
    const userId = searchFinder('user_id') || userInfo.user_id
    getBlogByUser(userId, page, 5).then((res) => {
      setState({ user: userInfo, blogs: res?.list, total: res?.total })
    })
  }

  const fetchUser = () => {
    const userId = searchFinder('user_id') || userInfo.user_id
    getUser(Number(userId)).then((res) => {
      setState((pre) => ({ user: res?.user, blogs: pre.blogs, total: pre?.total }))
    })
  }

  React.useEffect(() => {
    const urlUserId = searchFinder('user_id') || userInfo.user_id
    if (urlUserId == -1) return
    Promise.all([getUser(Number(urlUserId)), getBlogByUser(Number(urlUserId), 1, 5)]).then((res) => {
      setState({
        user: res[0]?.user,
        blogs: res[1]?.list,
        total: res[1]?.total
      })
    })
  }, [userInfo, location.search, searchFinder])

  return <div className={styles.box}>
    <div className={styles.left}>
      <User {...state.user} user={state.user} refreshData={fetchUser} />
      {/* <Input value={value} onChange={(e) => {
      setValue(e.target.value)
    }}></Input>
    <Button onClick={() => addTag(value)}>添加</Button>
    <Button onClick={() => getTags()}>拉取</Button> */}
      <Divider style={{ margin: '6px 0' }} />
      {state?.blogs?.length ? <Card
        title={<div>博客气泡 <Tooltip title="当您的博客被推荐给其他用户时，会以如下形式展示。"><QuestionCircleOutlined /></Tooltip></div>}
        className={styles.bubbleCard}
        bodyStyle={{ display: 'flex', flexWrap: 'wrap' }}>
        {state.blogs?.map((item: BlogType, index: number) => {
          return <Bubble onClick={() => window.open(`${window.location.origin}/#/blog-read?blog_id=${item.blog_id}`)} key={index} size={90} title={item.title} titleLine={2} titleWidth="90%" floatSizeRangeConst={0.5} floatMarginConst={0.1} wrapWidth={115} />
        })}
      </Card> : null}
    </div>

    <div className={styles.content}>
      <Card title={state.user && state.user.user_id === userInfo.user_id ? '我的博客' : '博客列表'} bordered={false} style={{ width: '100%' }}>
        {state?.blogs?.length ? state.blogs.map(item => {
          return <Blog key={item.blog_id} {...item} refetch={() => fetchBlog(current)} />
        }) : <CustomEmpty description={!state.user?.is_me ? '该用户没有发布过博客' : '去发布一篇博客吧'} />}
        <Pagination pageSize={5} total={state.total} onChange={(page) => { setCuerrent(() => page); fetchBlog(page) }} />
      </Card>

    </div>



  </div>
}

export default UserBlog