import * as React from 'react';
import { Button, Divider, Popconfirm, Tag } from 'antd';
import { CommentType } from '@/pages/blog-edit';
import { UserType } from '../user';
import styles from './index.module.less'
import Secondary from './components/secondary';
import CustomTag from '../common/tag';


type IProps = {
  // 一级评论功能
  commentCon: CommentType
  userInfo?: UserType
  onReply?: () => void
  handleDelete?: (id: number, secondary_id?: string) => void
  // 二级评论需要的功能
  showDrawer?: () => void // 显示抽屉
  setTarget?: (value: string) => void // 修改当前评论目标的评论id
  setComment?: (value: CommentType) => void // 修改当前显示在drawer中的评论
  setParent?: (value: number) => void
  forReply?: boolean // 为二级评论提供回复能力
}

const Comment: React.FC<IProps> = ({ commentCon, userInfo, onReply, handleDelete, showDrawer, setTarget, setComment, setParent, forReply = false }) => {
  const { username, create_time, content, secondary_comments, user_id, id } = commentCon
  const secondary_list = secondary_comments || []
  return <div>
    <div className={styles.comment}>
      <span className={styles.username}>{!commentCon.comment_privacy_level && <CustomTag con="私密"></CustomTag>}{username}</span>  <span className={styles.content}>{content}</span>
      <div className={styles.time}>
        <span>{create_time}</span>
        {!forReply && <span className={styles.reply}>
          <Button type="link" onClick={onReply} >回复</Button>
          {user_id === userInfo?.user_id &&
            <Popconfirm
              title="提示"
              description="确认删除该评论吗?"
              onConfirm={() => handleDelete?.(id!)}
              okText="确定"
              cancelText="取消"
            >
              <Button type='link' danger>删除</Button>
            </Popconfirm>
          }
        </span>}
      </div>
    </div>
    {!forReply ? <div style={{ marginLeft: 24 }}>{secondary_list.length > 0 && secondary_list.map((item: CommentType, index: number) => {
      const { username = '', user_id = 0, target_comment_id = '', commented_username = '', commented_user_id = 0, content, create_time = '', parent_level_id = 0, secondary_id = '' } = item
      const data = {
        username,
        user_id,
        target_comment_id,
        content,
        create_time,
        parent_level_id,
        secondary_id,
        commented_username,
        commented_user_id
      }
      return <Secondary key={item.secondary_id} {...data} showDelete={user_id === userInfo?.user_id} username={username || ''} onReply={() => {
        setTarget?.(secondary_id || '')
        setParent?.(parent_level_id)
        setComment?.(item)
        showDrawer?.()
      }} handleDelete={handleDelete!} />
    })}</div> : null}
    <Divider style={{ margin: '6px 0' }} />
  </div>
}

export default Comment
