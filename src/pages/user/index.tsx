import * as React from 'react';
import UserCard from '@/components/user';
import useUser from '@/hooks/useUser'
import { get } from '@/services/request';
import { Button } from 'antd';

type IProps = any

const User: React.FC<IProps> = function () {
  const { userInfo } = useUser()
  const handleClick = () => {
    console.log(userInfo);

  }
  return <div>
    <Button onClick={() => handleClick()}>点击测试</Button>
    {/* <UserCard {...userInfo}> */}
  </div>
}

export default User
