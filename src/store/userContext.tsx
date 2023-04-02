import { UserType } from '@/components/user'
import { create } from 'zustand'

const useUserStore = create<{ userInfo: UserType, setUser: any }>((set) => {
  const userInfo = decodeURIComponent(window.atob((localStorage.getItem('userinfo') || '')))
  return {
    userInfo: userInfo ? JSON.parse(userInfo) : { username: '', description: '', email: '', user_id: 0 },
    setUser: (value: UserType) => set({ userInfo: value }),
  }
})

export default useUserStore