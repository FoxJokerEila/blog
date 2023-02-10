import * as React from 'react';
import { Button } from 'antd'
import { getHotBlog } from '@/services/home';
import styles from './index.module.less'

type IProps = any

const Home: React.FC<IProps> = function () {

  const [page, setPage] = React.useState<number>(0)

  const fetchBlog = () => {
    console.log(page);
    getHotBlog(page + 1).then((res) => {
      console.log(res);
    })
    setPage(page + 1)
  }

  return <div>
    <Button onClick={fetchBlog} type="primary" className={styles.refreshBtn}>换一批</Button>
    hello world
  </div>
}

export default Home
