import * as React from 'react';
import { Button, Drawer, DrawerProps, Input, Select } from 'antd'
import Comment from '@/components/comment'
import { CommentType } from '@/pages/blog-edit';
import styles from './index.module.less'

type IProps = {
  onSubmit: (comment: string, parent_level_id?: number, target_comment_id?: string, privacy?: number) => void
  defaultProp: DrawerProps
  comment?: CommentType
  privacySet?: number
  defaultPrivacy?: number
  parent_level_id?: number
  target_comment_id?: string
}

const { TextArea } = Input;

const CommentDrawer: React.FC<IProps> = ({ onSubmit, defaultProp, comment, privacySet, defaultPrivacy = 0, parent_level_id, target_comment_id }) => {
  const [value, setValue] = React.useState<string>('')
  const [privacy, setPrivacy] = React.useState<number>(defaultPrivacy)

  React.useEffect(() => {
    if (!defaultProp.open) return
    if (privacySet === 1) {
      setPrivacy(defaultPrivacy)
    } else {
      setPrivacy(0)
    }
  }, [defaultPrivacy, defaultProp.open, privacySet])

  return <Drawer {...defaultProp} onClose={(e) => {
    defaultProp?.onClose?.(e);
    setValue('')
  }} destroyOnClose>
    {comment && comment?.blog_id !== 0 && <Comment commentCon={comment} forReply />}
    <TextArea
      value={value}
      maxLength={500}
      onChange={(e) => setValue(e.target.value)}
      placeholder="请输入评论"
      autoSize={{ minRows: 3 }}
    />
    <div className={styles.commentBtn}>
      <Select
        className={styles.privacy}
        value={privacy}
        style={{ width: 70 }}
        onChange={setPrivacy}
        options={privacySet === 0 ? [{ value: 0, label: '私密' }] : [
          { value: 0, label: '私密' },
          { value: 1, label: '公开' },
        ]}
      />
      <Button type='primary' className={styles.btn} onClick={() => { onSubmit(value, parent_level_id, target_comment_id, privacy); setValue('') }}>评论</Button>
    </div>
    {privacySet === 0 && <div className={styles.tip}>作者设置为仅允许私密评论。</div>}
  </Drawer>
}

export default CommentDrawer
