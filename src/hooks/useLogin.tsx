import alertNotification from '@/components/common/notification';

const useLogin = (() => {
  const loginFn = (res: any) => {
    if (!res) {
      alertNotification('提示', '登陆过期')
      return
    }
    if (res?.code !== 0) {
      alertNotification('提示', res.data.msg)
      return
    }
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('userinfo', window.btoa(encodeURIComponent(JSON.stringify(res.data.userinfo))))
    window.location.href = '/'
  }
  return { loginFn }
})

export default useLogin
