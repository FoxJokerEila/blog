import * as React from 'react';
import { Button, Card, Popconfirm, Tag, Tooltip } from 'antd'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'; // 引入 UTC 插件
import timezone from 'dayjs/plugin/timezone'; // 引入时区插件
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import styles from './index.module.less'
import record from '@/recorder';
import { deleteBlog } from '@/services/blog';
import alertNotification from '../common/notification';
import { handleLikeCount } from '@/utils';
import BlogPrivacyModal from './components/privacy-modal';
import useBoolean from '@/hooks/useBoolean';
import CustomTag from '../common/tag';


dayjs.extend(utc); // 扩展 Day.js 的 UTC 插件
dayjs.extend(timezone); // 扩展 Day.js 的时区插件


export type BlogType = {
  blog_id: number
  title: string
  abstract?: string
  author?: string
  create_time?: string
  content?: string
  like?: number
  comment?: number
  user_id?: number
  is_me?: boolean
  is_liked?: boolean
  tags?: string
  // 博客隐私等级，是否公开，默认 1 公开
  blog_privacy_level?: number
  // 博客的评论隐私等级，允许公开评论 1，禁止公开评论 0，默认 0
  comment_privacy_level?: number
  // 是否允许评论 允许1，禁止0, 默认 1，允许
  is_commentable?: number

}

const Blog: React.FC<BlogType & { type?: 'default' | 'mini', refetch?: () => void }> = ({ blog_id, title, abstract, author, create_time, like, comment, user_id, is_me, is_liked, blog_privacy_level, comment_privacy_level, is_commentable, type = 'default', refetch }) => {
  const { state: open, setT: showModal, setF: onClose } = useBoolean(false)
  const blogPrivacy = {
    blog_id,
    user_id,
    blog_privacy_level,
    comment_privacy_level,
    is_commentable
  }
  const handleDelete = (e: any) => {
    e.stopPropagation()
    deleteBlog(blog_id).then((res) => {
      if (res?.code === 0) {
        refetch?.()
      }
    })
  }

  const handleUpdate = (e: any) => {
    e.stopPropagation()
    window.open(`${window.location.origin}/blog-edit?blog_id=${blog_id}`)
  }

  /**
   * 更新博客的隐私设置
   * @param blog_id 
   * @param user_id 
   */
  const handlePrivacy = (blog_id: number, user_id: number) => {

  }


  return type === 'default' ? <Card className={styles.blog}
    bordered={false}
  >
    <BlogPrivacyModal refetch={refetch} open={open} closeModal={onClose} blogPrivacy={blogPrivacy} />
    <div className={styles.content} onClick={() => {
      console.log({ blogPrivacy });
      !is_me && record('click', { blog_id })
      window.open(`${window.location.origin}/blog-read?blog_id=${blog_id}`)
    }}>
      <div className={styles.left}>
        <div><h3 className={styles.title}>{title}</h3></div>
        <div className={styles.abstract}>{abstract}</div>
        <span className={styles.likeInfo}>{is_liked ? <LikeFilled /> : <LikeOutlined />}&nbsp;{handleLikeCount(like)}</span>
        <span>{comment}</span>
      </div>

      <div className={styles.right}>
        {Boolean(is_me && blogPrivacy.blog_privacy_level === 0) ? <CustomTag con="私密"></CustomTag> : null}
        {is_me && <div>
          <Popconfirm
            title="提示"
            description={<span>确认删除该博客吗?</span>}
            onConfirm={handleDelete}
            okText="确认"
            okButtonProps={{ style: { boxShadow: 'none' } }}
            cancelText="取消"
          >
            <Button size='small' onClick={(e) => e.stopPropagation()} type='text' danger>删除</Button>
          </Popconfirm>
          <Button size='small' onClick={handleUpdate} type='link' style={{ boxShadow: 'none' }}>编辑</Button>
          {/* 在 Blog 组件中的数据，一定有 user_id */}
          <Button size='small' onClick={(e) => { e.stopPropagation(); showModal() }} type='text' style={{ boxShadow: 'none', marginRight: 5 }}>设置</Button>
        </div>}
        <div style={{ textAlign: 'right', paddingRight: '15px', color: 'rgba(0, 0, 0, 0.65)' }}>{author}</div>
        <div style={{ textAlign: 'right', paddingRight: '15px', color: 'rgba(0, 0, 0, 0.45)' }}>{dayjs.utc(create_time).local().format('YYYY-MM-DD HH:mm:ss')}</div>

      </div>
    </div>
  </Card> : <div className={styles.blog} onClick={() => {
    !is_me && record('click', { blog_id })
    window.open(`${window.location.origin}/blog-read?blog_id=${blog_id}`)
  }}>
    <span className={styles.title}>
      {title}
    </span>
  </div>
}

export default Blog
