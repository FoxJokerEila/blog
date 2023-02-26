import * as React from 'react';
import { Card } from 'antd'
import { LikeOutlined } from '@ant-design/icons'
import styles from './index.module.less'

export type BlogType = {
  blogId?: number
  title: string
  author: string
  createTime: string
  content?: string
  like: number
  comment: number
}

const Blog: React.FC<BlogType> = ({ title, author, createTime, like, comment }) => {
  return <Card className={styles.blog} bordered={false}>
    <div><h3>{title}</h3></div>
    <span><LikeOutlined />{like}</span>
    <span>{comment}</span>
    <div className={styles.detail}>
      <span>{createTime}</span>
      <span>{author}</span>
    </div>
  </Card>
}

export default Blog
