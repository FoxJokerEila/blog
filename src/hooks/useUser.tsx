import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/components/user';

const useUser = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = React.useState<UserType>({ user_id: -1, username: '', email: '', description: '' })
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    const userinfo = decodeURIComponent(window.atob((localStorage.getItem('userinfo') || '')))
    if (token && userinfo) {
      setUserInfo(JSON.parse(userinfo))
    } else if (!['register', 'login'].includes(window.location.pathname.slice(1))) {
      navigate('/login')
    }
  }, [navigate])
  return { userInfo, setUserInfo }
}

export default useUser
