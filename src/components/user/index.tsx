import * as React from 'react';

type IProps = {
  username: string
  email: string
  description: string
}

const UserCard: React.FC<IProps> = ({ username, email, description }) => {
  return <div>
    {username}
  </div>
}

export default UserCard;
