import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '@/components/user';
import { refetchUser } from '@/services/user';
import useUserStore from '@/store/userContext';

const useUser = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = React.useState<UserType>({ user_id: -1, username: '', email: '', description: '', privacy: {}, fans: 0, following: 0, favor: { current: 0, list: [] } })
  const setUser = useUserStore(set => set.setUser)
  const refreshUser = () => {
    refetchUser().then((res) => {
      const { user } = res
      localStorage.setItem('userinfo', window.btoa(encodeURIComponent(JSON.stringify(user))))
      if (user) {
        setUserInfo(() => ({ ...user }))
        setUser(user)
      } else if (!['register', 'login'].includes(window.location.pathname.slice(1))) {
        navigate('/login')
      }
    })
  }

  const getLocalUser = () => {
    return JSON.parse(decodeURIComponent(window.atob((localStorage.getItem('userinfo') || ''))))
  }

  React.useEffect(() => {
    const token = localStorage.getItem('token')
    const userinfo = decodeURIComponent(window.atob((localStorage.getItem('userinfo') || '')))
    if (token && userinfo) {
      setUserInfo(JSON.parse(userinfo))
    } else if (!['register', 'login'].includes(window.location.pathname.slice(1))) {
      navigate('/login')
    }
  }, [navigate, setUser])
  return { userInfo, setUserInfo, refreshUser, getLocalUser }
}

export default useUser
