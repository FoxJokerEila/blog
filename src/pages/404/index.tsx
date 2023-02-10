import * as React from 'react';
import { Result } from 'antd';
import { Link } from 'react-router-dom'

const Lost: React.FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="抱歉，页面已丢失"
    extra={<Link to="/">回到首页</Link>}
  />
);

export default Lost;