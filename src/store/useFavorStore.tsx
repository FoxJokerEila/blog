import { create } from 'zustand'

const useFavorStore = create<{ favorIdx: number, setFvr: (idx: number) => void }>((set) => {
  return {
    favorIdx: 0,
    setFvr: (idx) => set({ favorIdx: idx }),
  }
})

export default useFavorStore