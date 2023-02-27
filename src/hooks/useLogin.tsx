import alertNotification from '@/components/common/notification';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = (() => {
  const navigate = useNavigate()
  const loginFn = (res: any) => {
    if (!res) {
      alertNotification('提示', '登陆过期')
      return
    }
    if (res.data.code !== 0) {
      alertNotification('提示', res.data.msg)
      return
    }
    localStorage.setItem('token', res.data.data.token)
    console.log(res.data.data.userinfo);

    localStorage.setItem('userinfo', window.btoa(encodeURIComponent(JSON.stringify(res.data.data.userinfo))))
    navigate('/')
  }
  return { loginFn }
})

export default useLogin
