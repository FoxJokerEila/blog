import * as React from 'react';
import { Button } from 'antd'
import { getHotBlog } from '@/services/home';
import Bubble from '@/components/bubble'
import styles from './index.module.less'
import useSearch from '@/hooks/useSearch';
import { minHeight } from '@/layout/config';
import useRequest from '@/hooks/useRequest';
import { recommend } from '@/services/blog';
import { BlogType } from '@/components/blog';
import record from '@/recorder';

type IProps = any

const Home: React.FC<IProps> = function () {

  // const [page, setPage] = React.useState<number>(0)
  const [id_list, setIds] = React.useState<number[]>([])

  const { data = [], fetchData } = useRequest(async () => {
    const res = await recommend(id_list);
    if (res.reset) {
      setIds([])
    } else {
      setIds(res?.id_list)
    }
    return res?.blogs;
  }, { deps: [] })

  return <div className={styles.box} style={{ minHeight: minHeight }}>
    <Button onClick={() => fetchData()} type="primary" className={styles.refreshBtn}>换一批</Button>
    <div style={{ maxHeight: minHeight, position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      {data && data?.map((item: BlogType, index: number) => {
        return <Bubble key={index} titleSize={16} title={item.title} onClick={() => { record('click', { blog_id: item.blog_id }); window.open(`${window.location.origin}/blog-read?blog_id=${item.blog_id}`) }} />
      })}
    </div>

  </div>
}

export default Home
