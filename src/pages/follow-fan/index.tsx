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

const FollowFan: React.FC = () => {
  const location = useLocation()
  const { searchFinder } = useSearch()
  const { data: detail = {
    fans: [],
    following: [],
    user: { user_id: -1, username: '', email: '', description: '' },
  },
    fetchData, setData } = useRequest<{
      fans: any[],
      following: any[],
      user: UserType,
    }>(async () => {
      const user_id = searchFinder('user_id')
      if (user_id) {
        const res = await getFollowFan(user_id)
        return {
          fans: res.fans,
          following: res.following,
          user: res.user,
        }
      } else {
        return Promise.resolve({ fans: [], following: [], user: { user_id: -1, username: '', email: '', description: '' } })
      }
    }, {
      deps: [location.search, searchFinder],
    })
  return <div className={styles.box}>
    <div className={styles.left}><Tabs
      defaultActiveKey="1"
      centered
      items={[detail.fans, detail.following].map((list, i) => {
        const id = String(i + 1);
        return {
          label: i === 0 ? '粉丝' : '关注',
          key: id,
          children: <div>{list.length ? list.map(user => <User {...user} refreshData={fetchData} keepFollow
            onUnfollow={() => {
              setData((pre) => {
                return {
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

          />) : <CustomEmpty description={`暂无${i === 0 ? '粉丝' : '关注'}`} />} </div>,
        };
      })}
    /></div>
    <div className={styles.right}>
      <User {...detail?.user} user={detail?.user} refreshData={fetchData} />
    </div>
  </div>
}

export default FollowFan
