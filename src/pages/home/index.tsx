import * as React from 'react';
import { Button } from 'antd'
import { getHotBlog } from '@/services/home';
import Bubble from '@/components/bubble'
import styles from './index.module.less'
import useSearch from '@/hooks/useSearch';
import { minHeight } from '@/layout/config';

type IProps = any

const Home: React.FC<IProps> = function () {

  const [page, setPage] = React.useState<number>(0)
  const { search } = useSearch()

  const fetchBlog = () => {
    console.log(page);
    getHotBlog().then((res) => {
      console.log(res);
    })
    setPage(page + 1)
  }

  return <div style={{ minHeight: minHeight }}>
    <Button onClick={fetchBlog} type="primary" className={styles.refreshBtn}>换一批</Button>
    <div style={{ maxHeight: minHeight, position: 'relative', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => {
        return <Bubble key={index} />
      })}
    </div>

  </div>
}

export default Home
