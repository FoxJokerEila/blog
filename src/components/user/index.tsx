import * as React from 'react';
import { EditOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

const { Meta } = Card;

export type UserType = {
  user_id: number
  username: string
  email: string
  description: string
  isMe?: boolean
}

const UserCard: React.FC<UserType> = ({ username, email, description, isMe }) => {
  return <Card
    title={username}
    actions={!isMe ? undefined : [
      <Link to='/user'><EditOutlined key="edit" /></Link>
    ]}
    extra={email}
    style={{ width: 300 }}
  >
    <Meta
      description={['', null, undefined].includes(description) ? '暂无简介' : description}
    />
  </Card>
}

export default UserCard;
