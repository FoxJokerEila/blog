import * as React from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs'
import { Badge, Button, Card, Divider, Tag } from 'antd';
import { ClockCircleFilled, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { getBlog, getBlogByUser, like, comment, deleteComment } from '@/services/blog';
import User, { UserType } from '@/components/user';
import Blog, { BlogType } from '@/components/blog';
import { CommentType } from '@/pages/blog-edit'
import useSearch from '@/hooks/useSearch';
import useRequest from '@/hooks/useRequest';
import useUser from '@/hooks/useUser';
import { handleLikeCount } from '@/utils';
import CommentDrawer from './comment-drawer';
import styles from './index.module.less'
import CustomEmpty from '@/components/common/empty';
import useBoolean from '@/hooks/useBoolean';
import Comment from '@/components/comment';



const BlogRead: React.FC = function () {
  const { state: commentVisible, setF: closeDrawer, setT: openDrawer } = useBoolean(false)
  const [parentId, setParent] = React.useState<number>(0)
  const [targetId, setTarget] = React.useState<string>('')
  const [commentState, setComment] = React.useState<CommentType>({
    content: '',
    blog_id: 0
  })
  const location = useLocation()
  const { searchFinder } = useSearch()
  const { userInfo, setUserInfo } = useUser()

  const { data: detail = {
    blog: undefined,
    comments: [],
    user: { user_id: -1, username: '', email: '', description: '' },
    tags: []
  },
    fetchData } = useRequest<{
      blog: BlogType | undefined,
      comments: CommentType[],
      user: UserType,
      tags: { id: number, name: string }[]
    }>(async () => {
      const blogId = searchFinder('blog_id')
      if (blogId) {
        const res = await getBlog(blogId)
        return {
          blog: res.blog,
          comments: res.comments,
          user: res.user,
          tags: res.tags
        }
      } else {
        return Promise.resolve({ blog: undefined, comments: [], user: { user_id: -1, username: '', email: '', description: '' }, tags: [] })
      }
    }, {
      deps: [location.search, searchFinder],
    })

  const handleLike = () => {
    const blogId = searchFinder('blog_id')
    like(Number(blogId), true).then(res => {
      if (res?.code === 0) {
        fetchData()
        setUserInfo(() => res.user)
      }
    })
  }

  const handleCancelLike = () => {
    const blogId = searchFinder('blog_id')
    like(Number(blogId), false).then(res => {
      if (res?.code === 0) {
        fetchData()
        setUserInfo(() => res.user)
      }
    })
  }

  const onComment = (content: string, parent_level_id?: number, target_comment_id?: string, privacy?: number) => {
    const blogId = searchFinder('blog_id')
    const { user } = detail!
    const commentData: CommentType = {
      content,
      blog_id: blogId,
      commented_user_id: user.user_id,
      commented_username: user.username,
      parent_level_id,
      target_comment_id,
      comment_privacy_level: privacy,
    }
    comment(commentData).then(res => {
      onClose()
      fetchData()
    })
  }

  const onClose = () => {
    setParent(0)
    setTarget('')
    setComment({
      content: '',
      blog_id: 0
    })
    closeDrawer()
  }

  const handleCommentDelete = (comment_id: number, secondary_id?: string) => {
    deleteComment(comment_id, secondary_id).then(() => {
      fetchData()
    })
  }

  const { data: hotList } = useRequest<BlogType[]>(async () => {
    const res: BlogType[] = (await getBlogByUser(detail.user.user_id)).list
    return Promise.resolve(res)
  }, { deps: [detail.user.user_id] })

  return <div className={styles.box}>
    <div className={styles.left}>
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

      <Card title="评论" className={styles.comments} extra={Boolean(detail.blog?.is_commentable) && <Button type='primary' onClick={openDrawer}>评论</Button>}>
        {detail.blog?.is_commentable ? (detail.comments?.length ? detail.comments.map((cmmnt) => {
          // commentCon: 每个一级评论展示的内容
          // showDrawer: 在评论组件内部点击二级评论的回复时，需要展示抽屉
          // onReply: 点击一级评论的回复时，需要展示抽屉，设置一级评论的id作为父级评论id，设置该一级评论为抽屉展示的评论内容
          // setTarget: 传入评论组件，供二级评论回复时调用
          // setComment: 传入评论组件，当回复二级评论时，抽屉展示的评论应该为这个二级评论
          return <Comment
            key={cmmnt.id}
            userInfo={userInfo}
            commentCon={cmmnt}
            showDrawer={openDrawer}
            onReply={() => { openDrawer(); setParent(cmmnt.id || 0); setComment(cmmnt) }}
            setTarget={setTarget}
            setComment={setComment}
            setParent={setParent}
            handleDelete={handleCommentDelete}
          />

        }) : <CustomEmpty description="暂无评论" />) : <CustomEmpty description="作者关闭了评论区" />}

      </Card>
      {/* commentState: 展示在抽屉中的评论内容 */}
      {/* parent_level_id: 当发起二级评论时，需要设置一级评论的id */}
      {/* target_comment_id: 当对二级评论进行评论时，需要设置目标二级评论的评论id */}
      <CommentDrawer comment={commentState} defaultPrivacy={detail.user.privacy?.comment_privacy_level} onSubmit={onComment} parent_level_id={parentId} target_comment_id={targetId} defaultProp={{
        open: commentVisible,
        onClose,
        width: 500,
      }} />
    </div>
    <div className={styles.right}>
      <User {...detail?.user} user={detail?.user} refreshData={fetchData} />
      <Card title="热门文章" extra={<Button type="link" onClick={() => window.open(`${window.location.origin}/user-blog?user_id=${detail.user.user_id}`)}>更多</Button>} style={{ width: 300, marginTop: 12 }} bodyStyle={{ paddingTop: 12 }}>
        {hotList?.slice(0, 5).map((item: BlogType) => {
          return <Blog key={item.blog_id} type="mini" {...item} blog_id={item.blog_id} title={item.title}></Blog>
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
