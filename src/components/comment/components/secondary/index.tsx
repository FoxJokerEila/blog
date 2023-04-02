import { Button, Divider, Popconfirm } from 'antd';
import * as React from 'react';
import styles from './index.module.less'

type IProps = {
  username: string
  user_id: number
  content: string
  create_time: string
  parent_level_id: number
  secondary_id: string
  onReply: () => void
  showDelete: boolean
  target_comment_id?: string
  commented_username?: string
  commented_user_id?: number
  handleDelete?: (comment_id: number, secondary_id?: string) => void
}

const Secondary: React.FC<IProps> = ({ username, user_id, content, create_time, parent_level_id, secondary_id, onReply, showDelete, target_comment_id, handleDelete, commented_username, commented_user_id }) => {
  return <div className={styles.comment}>
    <span className={styles.username}>{username}</span>{Boolean(target_comment_id && commented_username) && <span className={styles.username}> 回复 {commented_username}</span>}{commented_username && <br />}  <span className={styles.content}>{content}</span>
    <div className={styles.time}>
      <span>{create_time}</span>
      <span className={styles.reply}>
        <Button type="link" onClick={onReply} >回复</Button>
        {showDelete &&
          <Popconfirm
            title="提示"
            description="确认删除该评论吗?"
            onConfirm={() => handleDelete?.(parent_level_id, secondary_id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type='link' danger>删除</Button>
          </Popconfirm>
        }
      </span>
    </div>
    <Divider style={{ margin: '6px 0' }} />
  </div>
}

export default Secondary