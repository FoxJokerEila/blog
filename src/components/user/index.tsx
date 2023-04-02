import * as React from 'react';
import { Button, Card, Divider } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined, SettingOutlined } from '@ant-design/icons';
import PrivacyModal from '../privacy';
import styles from './index.module.less'
import useBoolean from '@/hooks/useBoolean';
import alertMessage from '../common/message';
import { follow, unfollow } from '@/services/user';
import useUser from '@/hooks/useUser';

const { Meta } = Card;

export type UserType = {
  user_id: number
  username: string
  email: string
  description: string
  is_following?: boolean
  is_me?: boolean
  privacy?: PrivacyType
  user?: UserType
  fans?: number
  following?: number
}

export type PrivacyType = {
  blog_privacy_level?: number
  comment_privacy_level?: number
  is_my_comment_public?: number
  is_commentable?: number
  fans_privacy?: number
  following_privacy?: number
}

type UserCardType = UserType & {
  refreshData?: (params?: any) => void
  onUnfollow?: () => void
}

const UserCard: React.FC<UserCardType> = ({ user_id, username, email, description, is_me, is_following, user, fans, following, refreshData, onUnfollow }) => {
  const { state: open, setT: openModal, setF: close } = useBoolean(false)
  const { refreshUser } = useUser()
  const handleDisable = (e: any, str: string) => {
    e.preventDefault()
    alertMessage({
      msg: `该用户将${str}列表设置为不可见。`,
      type: 'info'
    })
  }
  // 根据之后的用途 决定是否抽离出这两个方法
  const handleFollow = (user_id?: number) => {
    user_id && follow(user_id).then(() => {
      refreshData?.()
      refreshUser()
    })
  }
  const handleUnfollow = (user_id?: number) => {
    user_id && unfollow(user_id).then((res) => {
      !onUnfollow && refreshData?.(res.following)
      onUnfollow?.()
      refreshUser()
    })
  }
  return <Card
    title={<Link target="_blank" style={{ color: 'rgba(0,0,0,0.65)' }} to={`/user-blog?user_id=${user_id}`}>{username}</Link>}
    actions={!is_me ? [user?.is_following || is_following ? <Button onClick={() => handleUnfollow(user?.user_id || user_id)}>已关注</Button> : <Button onClick={() => handleFollow(user?.user_id || user_id)}>关注</Button>] : [
      <Link to='/user'><EditOutlined key="edit" /></Link>, <Link to='' onClick={(e) => { openModal(); e.preventDefault() }}><SettingOutlined /></Link >
    ]}
    extra={email}
    style={{ width: 300 }}
    bodyStyle={{ padding: '6px 24px' }}
  >
    <PrivacyModal {...user?.privacy} user={user} refreshData={refreshData} closeModal={close} open={open} onCancel={close} ></PrivacyModal>
    <Meta
      style={{ margin: '6px 0 12px' }}
      description={['', null, undefined].includes(description) ? '暂无简介' : description}
    />
    <Divider style={{ margin: '6px 0' }} />
    <div className={styles.association}>
      <Link to={`/follow-fan?user_id=${user?.user_id || user_id}&type=fan`} onClick={!is_me && !user?.privacy?.fans_privacy ? (e) => handleDisable(e, '粉丝') : undefined} target="_blank">
        <div>
          <div className={styles.num}>{fans}</div>
          <div className={styles.text}>粉丝</div>
        </div>
      </Link>
      <Link to={`/follow-fan?user_id=${user?.user_id || user_id}&type=follow`} onClick={!is_me && !user?.privacy?.following_privacy ? (e) => handleDisable(e, '关注') : undefined} target="_blank">
        <div>
          <div className={styles.num}>{following}</div>
          <div className={styles.text}>关注</div>
        </div>
      </Link>
    </div>
  </Card>
}

export default UserCard;
