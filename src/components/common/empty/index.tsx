import React from 'react';
import { Empty, EmptyProps } from 'antd';

const CustomEmpty: React.FC<EmptyProps> = (props) => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} {...props} />;

export default CustomEmpty;
