import * as React from 'react';
import { Button, Spin } from 'antd'
import { getHotBlog } from '@/services/home';
import Bubble from '@/components/bubble'
import styles from './index.module.less'
import useSearch from '@/hooks/useSearch';
import { minHeight } from '@/layout/config';
import useRequest from '@/hooks/useRequest';
import { recommend } from '@/services/blog';
import { BlogType } from '@/components/blog';
import record from '@/recorder';
import useFavorStore from '@/store/useFavorStore';
import { ReloadOutlined } from '@ant-design/icons';

type IProps = any

const Home: React.FC<IProps> = function () {
  const { favorIdx } = useFavorStore()
  const [id_list, setIds] = React.useState<number[]>([])
  const [trigger, setTrigger] = React.useState(false)
  const [spining, setSpining] = React.useState(false)
  const { loading, data = [], fetchData } = useRequest(async () => {
    const res = await recommend(id_list);
    if (res.reset) {
      setIds([])
    } else {
      setIds(res?.id_list)
    }
    return res?.blogs;
  }, { deps: [favorIdx], delay: 600 })

  const refresh = React.useCallback(() => {
    setSpining(true)
    new Promise((resolve, reject) => {
      setTrigger(() => !trigger)
      resolve(null)
    }).then(() => {
      fetchData();
      setSpining(false)
    })
  }, [fetchData, trigger])


  return <div className={styles.box} style={{ minHeight: minHeight }}>
    <Spin spinning={spining}>
      <Button icon={<ReloadOutlined />} loading={data?.length ? loading : false} onClick={() => { refresh(); }} type="primary" className={styles.refreshBtn}>换一批{trigger}</Button>

      <div style={{ maxHeight: minHeight, position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
        {data && data?.map((item: BlogType, index: number) => {
          return <Bubble key={index} titleSize={16} title={item.title} onClick={() => { record('click', { user_id: item.user_id, blog_id: item.blog_id }); window.open(`${window.location.origin}/blog-read?blog_id=${item.blog_id}`) }} />
        })}
      </div>
    </Spin>

  </div>
}

export default Home
