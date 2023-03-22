import * as React from 'react';
import { Button, Card, Popconfirm, Tooltip } from 'antd'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'; // 引入 UTC 插件
import timezone from 'dayjs/plugin/timezone'; // 引入时区插件
import { LikeOutlined, LikeFilled } from '@ant-design/icons'
import styles from './index.module.less'
import record from '@/recorder';
import { deleteBlog } from '@/services/blog';
import alertNotification from '../common/notification';


dayjs.extend(utc); // 扩展 Day.js 的 UTC 插件
dayjs.extend(timezone); // 扩展 Day.js 的时区插件


export type BlogType = {
  blog_id: number
  title: string
  author?: string
  create_time?: string
  content?: string
  like?: number
  comment?: number
  user_id?: number
  isMe?: boolean
  is_liked?: boolean
  tags?: string
}

const Blog: React.FC<BlogType & { type?: 'default' | 'mini', refetch?: () => void }> = ({ blog_id, title, author, create_time, like, comment, user_id, isMe, is_liked, type = 'default', refetch }) => {
  const handleDelete = (e: any) => {
    e.stopPropagation()
    deleteBlog(blog_id).then((res) => {
      if (res?.data.code === 0) {
        refetch?.()
        alertNotification('提示', '删除成功')
      } else {
        alertNotification('提示', res?.data.msg)
      }
    })
  }

  const handleUpdate = (e: any) => {
    e.stopPropagation()
    window.open(`${window.location.origin}/blog-edit?blog_id=${blog_id}`)
  }


  return type === 'default' ? <Card className={styles.blog}
    bordered={false}
    onClick={() => {
      record('click', user_id, blog_id)
      window.open(`${window.location.origin}/blog-read?blog_id=${blog_id}`)
    }}
  >
    <div className={styles.content}>
      <div className={styles.left}>
        <div><h3 className={styles.title}>{title}</h3></div>
        <span className={styles.likeInfo}>{is_liked ? <LikeFilled /> : <LikeOutlined />}{like}</span>
        <span>{comment}</span>
      </div>

      <div className={styles.right}>
        {isMe && <div>
          <Popconfirm
            title="提示"
            description={<span>确认删除该博客吗?</span>}
            onConfirm={handleDelete}
            okText="确认"
            okButtonProps={{ style: { boxShadow: 'none' } }}
            cancelText="取消"
          >
            <Button onClick={(e) => e.stopPropagation()} type='text' danger>删除</Button>
          </Popconfirm>
          <Button onClick={handleUpdate} type='link' style={{ boxShadow: 'none', marginRight: 5 }}>编辑</Button>
        </div>}
        <div style={{ textAlign: 'right', paddingRight: '15px', color: 'rgba(0, 0, 0, 0.65)' }}>{author}</div>
        <div style={{ textAlign: 'right', paddingRight: '15px', color: 'rgba(0, 0, 0, 0.45)' }}>{dayjs.utc(create_time).local().format('YYYY-MM-DD HH:mm:ss')}</div>

      </div>
    </div>

  </Card> : <div className={styles.blog} onClick={() => {
    record('click', user_id, blog_id)
    window.open(`${window.location.origin}/blog-read?blog_id=${blog_id}`)
  }}>
    <span className={styles.title}>
      {title}
    </span>
  </div>
}

export default Blog
