import { UserType } from '@/components/user';
import UserContext from '@/store/userContext';
import { MailOutlined, ExportOutlined } from '@ant-design/icons';
import { Popover, Divider, Button } from 'antd';
import * as React from 'react';
import styles from '../index.module.less'
import { Link } from 'react-router-dom';
import useUser from '@/hooks/useUser';
import useUserStore from '@/store/userContext';

type IProps = {
  // setUser: (value: UserType) => void
}

const UserPop: React.FC<IProps> = () => {
  const { getLocalUser, setUserInfo, userInfo } = useUser()
  const user = useUserStore(set => set.userInfo)
  return <Popover destroyTooltipOnHide arrowPointAtCenter overlayClassName={styles.user} placement="bottom"
    // onOpenChange={() => {
    //   setUserInfo(getLocalUser())
    // }} 
    title={<div className={styles.username}>{userInfo.username}</div>}
    content={<div className={styles.popoverCon}>
      <div className={styles.follow}>
        <span><Link to={`/follow-fan?user_id=${user?.user_id}&type=fan`}>粉丝：{user?.fans}</Link></span>
        <span><Link to={`/follow-fan?user_id=${user?.user_id}&type=follow`}>关注：{user?.following}</Link></span>
      </div>
      <Divider style={{ margin: '12px 0' }} />
      <span className={styles.description}>{userInfo.description}</span>
      <span className={styles.email}><MailOutlined />&nbsp;&nbsp;{userInfo.email}</span>
      <div className={styles.logOutBtn}><Button icon={<ExportOutlined />} onClick={() => {
        localStorage.clear();
        window.location.href = '/login'
      }}>退出登录</Button>
      </div>
    </div>}
  >
    <div className={styles.userInfo}>
      {userInfo.username}
    </div>
  </Popover>
}

export default UserPop