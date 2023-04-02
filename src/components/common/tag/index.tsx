import * as React from 'react';
import { Tag, TagProps } from 'antd';

const CustomTag: React.FC<TagProps & { con: string }> = (props) => {
  return <Tag color="rgba(0,0,0,0.45)" {...props}>
    {props.con}
  </Tag>
}

export default CustomTag