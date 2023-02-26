import { create } from 'zustand'

const useUser = create(() => ({
  username: '',
  email: '',
  description: ''
}))

export default useUser
