import { BlogType } from '@/components/blog';
import CustomEmpty from '@/components/common/empty';
import User, { UserType } from '@/components/user';
import useRequest from '@/hooks/useRequest';
import useSearch from '@/hooks/useSearch';
import { getFollowFan } from '@/services/user';
import { Card, Tabs } from 'antd';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './index.module.less'
import useUser from '@/hooks/useUser';

const FollowFan: React.FC = () => {
  const location = useLocation()
  const [activeKey, setActive] = React.useState('')
  const { searchFinder } = useSearch()
  const { userInfo } = useUser()
  const { data: detail = {
    fans: [],
    fans_msg: '',
    following: [],
    following_msg: '',
    user: { user_id: -1, username: '', email: '', description: '' },
  },
    fetchData, setData } = useRequest<{
      fans: any[],
      fans_msg?: string,
      following: any[],
      following_msg?: string,
      user: UserType,
    }>(async () => {
      const user_id = searchFinder('user_id')
      if (user_id) {
        const res = await getFollowFan(user_id)
        return {
          fans: res.fans,
          fans_msg: res.fans_msg,
          following: res.following,
          following_msg: res.following_msg,
          user: res.user,

        }
      } else {
        return Promise.resolve({ fans: [], fans_msg: '', following: [], following_msg: '', user: { user_id: -1, username: '', email: '', description: '' } })
      }
    }, {
      deps: [location.search, searchFinder],
    })

  React.useEffect(() => {
    const type = searchFinder('type')
    setActive(type === 'fan' ? '1' : '2')
  }, [location.search, searchFinder])

  return <div className={styles.box}>
    <div className={styles.left}><Tabs
      onChange={(key) => setActive(key)}
      activeKey={activeKey}
      centered
      items={[detail.fans, detail.following].map((list, i) => {
        const id = String(i + 1);
        return {
          label: i === 0 ? '粉丝' : '关注',
          key: id,
          children: <div>{((i === 0 && detail.fans_msg === '') || (i === 1 && detail.following_msg === '') || (userInfo.user_id === detail.user.user_id)) ? <div style={{ display: 'flex', padding: '0 0 12px', paddingRight: 12 }}>{list.length ? list.map(user => <div style={{ display: 'inline-block', marginLeft: 12 }}><User {...user} refreshData={fetchData} keepFollow
            onUnfollow={() => {
              setData((pre) => {
                return {
                  ...pre,
                  fans: pre?.fans || [],
                  user: pre?.user || { user_id: -1, username: '', email: '', description: '' },
                  following: pre?.following.map((it: UserType) => {
                    if (it.user_id === user.user_id) {
                      return {
                        ...it,
                        is_following: false
                      }
                    } else {
                      return {
                        ...it
                      }
                    }
                  }) || []
                }
              })
            }}

          /></div>) : <CustomEmpty style={{ margin: '24px auto' }} description={`暂无${i === 0 ? '粉丝' : '关注'}`} />} </div> : <CustomEmpty style={{ margin: '24px auto' }} description={`${i === 0 ? detail.fans_msg : detail.following_msg}`} />}</div>,
        };
      })}
    /></div>
    <div className={styles.right}>
      <User {...detail?.user} user={detail?.user} refreshData={fetchData} />
    </div>
  </div>
}

export default FollowFan
