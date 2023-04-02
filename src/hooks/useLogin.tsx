import alertNotification from '@/components/common/notification';
import useUserStore from '@/store/userContext';

const useLogin = (() => {
  const setUser = useUserStore(set => set.setUser)
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
    setUser(res.data.userinfo)
    console.log(res.data.userinfo);

    setTimeout(() => {
      window.location.href = '/'
    }, 500)
  }
  return { loginFn }
})

export default useLogin
